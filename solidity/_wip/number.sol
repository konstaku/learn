// SPDX-License-Identifier: UNKNOWN 
pragma solidity ^0.8.26;

contract Coin {
    address public minter;
    mapping (address => uint) public balances;

    event Sent (address from, address to, uint amount);

    constructor() {
        minter = msg.sender;
    }

    function mint (address reciever, uint amount) public {
        require(minter == msg.sender);
        balances[reciever] += amount;
    }

    error InsufficientBalance(uint requested, uint available);

    function send (address receiver, uint amount) public {
        require(amount <= balances[msg.sender], InsufficientBalance(amount, balances[msg.sender]));
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}