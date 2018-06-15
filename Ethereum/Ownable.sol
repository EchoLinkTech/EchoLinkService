pragma solidity ^0.4.18;

contract Ownable{

	//store address of owner
	address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

	function Ownable() public{
		owner = msg.sender;
	}

	//transfer ownership
	function transferOwnership(address newOwner) public onlyOwner {
		require(newOwner != address(0));
		owner = newOwner;
	}
}