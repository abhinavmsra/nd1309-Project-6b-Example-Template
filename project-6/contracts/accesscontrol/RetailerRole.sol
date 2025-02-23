// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./Roles.sol";

contract RetailerRole {
  using Roles for Roles.Role;

  event RetailerAdded(address indexed account);
  event RetailerRemoved(address indexed account);

  Roles.Role private retailers;

  constructor() {
    _addRetailer(msg.sender);
  }

  modifier onlyRetailer() {
    require(isRetailer(msg.sender));
    _;
  }

  function isRetailer(address account) public view returns (bool) {
    return retailers.has(account);
  }

  function addRetailer(address account) public onlyRetailer {
    _addRetailer(account);
  }

  function renounceRetailer() public {
    _removeRetailer(msg.sender);
  }

  function _addRetailer(address account) internal {
    retailers.add(account);
    emit RetailerAdded(account);
  }

  function _removeRetailer(address account) internal {
    retailers.remove(account);
    emit RetailerRemoved(account);
  }
}