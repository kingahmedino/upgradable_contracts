// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//version 2 of our Impl_A contract, here we just multiply whatever number was sent through the
//*setNum* function and add it to our existing state.
contract Impl_A2 {
    uint256 public num;
    address public sender;
    address public _implementation;

    function setNum(uint256 _num) public {
        num += 2 * _num;
        sender = msg.sender;
    }
}
