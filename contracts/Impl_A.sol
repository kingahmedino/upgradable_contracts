// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//Dummy contract that just adds to the value of *num* whenever *setNum* function is called.
contract Impl_A {
    uint256 public num;
    address public sender;
    address public _implementation;

    function setNum(uint256 _num) public {
        num += _num;
        sender = msg.sender;
    }
}
