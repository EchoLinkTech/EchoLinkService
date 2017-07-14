var Web3 = require('web3');
//var web3 = new Web3();

function connectToEth()
{
    var web3Endpoint = document.getElementById("web3Endpoint").value;
    console.log(web3Endpoint);
    if(typeof web3 !== 'undefined')
      web3 = new Web3(web3.currentProvider);
    else
      web3 = new Web3(new Web3.providers.HttpProvider(web3Endpoint));

    isEthNodeConnected();
}

/*function connectToEth()
{
	var web3Endpoint = document.getElementById("web3Endpoint");
	
		if (web3.currentProvider == 'undefined')
		{
			web3Endpoint.value = "ipc";
			web3.setProvider(web3.currentProvider);
		}	
		else
		{
			web3.setProvider(new web3.providers.HttpProvider(web3Endpoint.value));
		}
	
	isEthNodeConnected();
}*/

/*function connectToEth()
{
	var web3Endpoint = document.getElementById("web3Endpoint").value;
	console.log(web3Endpoint);
	if(typeof web3 !== 'undefined')
	  web3 = new Web3(web3.currentProvider);
	else
	  web3 = new Web3(new Web3.providers.HttpProvider(web3Endpoint));
	
	isEthNodeConnected();
}*/
			
function isEthNodeConnected()
{
	if(web3.isConnected())
	{
		swal("Nice!", "You are connected to your Ethereum Node!", "success");
		console.log("CONNECTED to Node");
	}
	else
	{
		swal({   title: "Error! Failed to Connect",   text: "Make sure you have the right address to connect (either RPC or IPC) and that you have allowed this website by changing the RPC CORS settings in your Ethereum client. Click the \"Need Help\" button for more information.", type: "error",   confirmButtonText: "Close" });
	}
}