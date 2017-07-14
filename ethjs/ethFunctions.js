var credentialContract;

function getLatestInfo() {
    try {
        credentialContract = web3.eth.contract(JSON.parse(document.getElementById("ABI").value)).at(document.getElementById("contract").value);

        console.log(JSON.parse(document.getElementById("ABI").value));
        console.log(document.getElementById("contract").value);
    } catch (err) {
        swal({ title: "Error! Check Your Contract Address and ABI Code", text: "", type: "error", confirmButtonText: "Close" });
    }
}

function getBlockchainURL() {
    try {
        window.open("https://live.ether.camp/account/" + document.getElementById("contract").value);
        //document.getElementById("viewContractOnChain").innerHTML = "<a href=https://www.etherchain.org/account/" + document.getElementById("contract").value + " &quot; target=&quot;_blank&quot;>View smart contract on the Ethereum blockchain</a>";
    } catch (err) {
        swal({ title: "Error! Check Your Contract Address", text: "", type: "error", confirmButtonText: "Close" });
    }
}

function checkOnsTestCredential() {
    try {
        getLatestInfo();
        //var vacationFund = web3.eth.getBalance(contractAddress);
        var credentialDateRaw = credentialContract.credentialDate({ from: web3.eth.coinbase });
        var credentialDate = moment(parseInt(credentialDateRaw, 10) * 1000).format('MMMM Do YYYY, h:mm:ss a');
        console.log(credentialDate);

        document.getElementById("mStatus").value = web3.toAscii(credentialContract.credentialStatus({ from: web3.eth.coinbase }));;
        document.getElementById("partner1").value = web3.toAscii(credentialContract.partner1({ from: web3.eth.coinbase }));;
        document.getElementById("partner2").value = web3.toAscii(credentialContract.partner2({ from: web3.eth.coinbase }));;
        document.getElementById("mDate").value = credentialDate;
        credentialImageHash = web3.toAscii(credentialContract.imageHash({ from: web3.eth.coinbase }));
        document.getElementById("mImage").innerHTML = "<a href=https://ipfs.pics/" + credentialImageHash + " &quot; target=&quot;_blank&quot;>" + credentialImageHash + "</a>";
        credentialProofHash = web3.toAscii(credentialContract.credentialProofDoc({ from: web3.eth.coinbase }));;
        document.getElementById("mProof").innerHTML = "<a href=https://ipfs.pics/" + credentialProofHash + " &quot; target=&quot;_blank&quot;>" + credentialProofHash + "</a>";
        //document.getElementById("mEth").value = web3.fromWei(vacationFund.toNumber(), 'ether');
        //document.getElementById("mEth").value = web3.fromWei(web3.eth.getBalance(document.getElementById("contract").value));

        getMajorEvents();
    } catch (err) {
        swal({ title: "Error! Check Your Contract Address and ABI Code", text: err, type: "error", confirmButtonText: "Close" });
    }
}

function getMajorEvents() {
    console.log("inside search");
    deleteRows(aTable);
    console.log("rows deleted");

	var event = credentialContract.MajorEvent( {}, {fromBlock: 0, toBlock: 'latest'});
	event.watch(function(error, result)
	{
		console.log("Inside event search");
		if (!error)
		{
 			var name = result.args.description;
 			console.log(result.data);
 		}
        console.log("Error is" + error);
		// Find a <table> element with id="aTable":
		var table = document.getElementById('aTable');

		// Create an empty <tr> element and add it to the last position of the table:
		var row = table.insertRow(1);

		// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
		var eventName = row.insertCell(0);
        var eventTime = row.insertCell(1);
        var description = row.insertCell(2);
        var timeSubmitted = row.insertCell(3);

		// Add some text to the new cells:

        // Event Name
        if(result.args.name == "")
            eventName.innerHTML = "Pending";
        else
            eventName.innerHTML = web3.toAscii(result.args.name);

        // Event Time
        if(result.args.description == "0")
            eventTime.innerHTML = "Pending";
        else
            eventTime.innerHTML = moment(parseInt(result.args.eventTimeStamp, 10) * 1000).format('MMMM Do YYYY, h:mm:ss a');

        // Description
        if(result.args.description == "")
            description.innerHTML = "Pending";
        else
            description.innerHTML = web3.toAscii(result.args.description);

		// Time Submitted
		if(result.args.description == "0")
			timeSubmitted.innerHTML = "Pending";
		else
			timeSubmitted.innerHTML = moment(parseInt(result.args.logTimeStamp, 10) * 1000).format('MMMM Do YYYY, h:mm:ss a');
});
};

function deleteRows(tableName) {
    var rowCount = tableName.rows.length;
    for (var i = rowCount - 1; i > 0; i--) {
        tableName.deleteRow(i);
    }
};
