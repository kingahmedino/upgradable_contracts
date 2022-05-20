// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

//Proxy contract a pointer to our implementation contracts  for upgrading
contract Proxy {
    uint256 public num;
    address public sender;
    address public _implementation;

    function setImplementation(address implementation) public {
        require(implementation != address(0));
        _implementation = implementation;
    }

    function setNum(uint256 _num) public {
        require(_implementation != address(0));
        (bool success, bytes memory data) = _implementation.delegatecall(
            abi.encodeWithSignature("setNum(uint256)", _num)
        );
    }
}
