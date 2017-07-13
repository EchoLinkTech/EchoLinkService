contract Credential
{
    // Credential data variables
    address public owner;
    bytes32 public issuer;
    bytes32 public recipient;
    uint256 public credentialDate;
    bytes32 public credentialStatus;
    bytes public imageHash;
    bytes public credentialProofDoc;
    
    //Set Owner
    function Credential() {
        owner = msg.sender;
    }
    modifier onlyowner() { 
        if (msg.sender == owner)
            _
    }

    // Create initial credential contract
    function createCredential(bytes32 issuerEntry, bytes32 recipientEntry, uint256 credentialDateEntry, bytes32 credentialEntry, bytes32 descriptionEntry) onlyowner
    {
        issuer = issuerEntry;
        recipient = recipientEntry;
        credentialDate = credentialDateEntry;
        setStatus(statusEntry);
        bytes32 name = “Credential Contract Creation";
        
        majorEventFunc(credentialDate, name, descriptionEntry);
    }
    
    function getOwner() returns (address owner)
    {
        return owner;
    }
    
    // Set the credential status if it changes
    function setStatus(bytes32 status) onlyowner
    {
        credentialStatus = status;
        majorEventFunc(block.timestamp, "Changed Status", status);
    }
    
    // Set the IPFS hash of the image of the recipient
    function setImage(bytes IPFSImageHash) onlyowner
    {
        imageHash = IPFSImageHash;
        majorEventFunc(block.timestamp, "Entered Recipient Image", "Image is in IPFS");
    }
    
    // Upload documentation for proof of credential - e.g. graduation certificate
    function credentialProof(bytes IPFSProofHash) onlyowner
    {
        credentialProofDoc = IPFSProofHash;
        majorEventFunc(block.timestamp, "Entered Credential Proof", “Credential proof in IPFS");
    }

    // Log major events
    function majorEventFunc(uint256 eventTimeStamp, bytes32 name, bytes32 description)
    {
        MajorEvent(block.timestamp, eventTimeStamp, name, description);
    }

    // Declare event structure
    event MajorEvent(uint256 logTimeStamp, uint256 eventTimeStamp, bytes32 indexed name, bytes32 indexed description);
    
    // This function gets executed if a transaction with invalid data is sent to
    // the contract or just ether without data. We revert the send so that no-one
    // accidentally loses money when using the contract.
    function () {
        throw;
    }
}
