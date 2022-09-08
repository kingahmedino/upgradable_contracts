const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Transparent Proxy", function () {
  let implA, implA2, proxy;
  let owner;
  let abi = [
    "function setNum(uint256 _num) public",
    "function getNum() public view returns (uint256)",
  ];

  beforeEach(async () => {
    [owner] = await ethers.getSigners();
    // We get the contract to deploy V1
    const ImplAFactory = await hre.ethers.getContractFactory("Impl_A");
    implA = await ImplAFactory.deploy();

    // We get the contract to deploy V2
    const ImplA2Factory = await hre.ethers.getContractFactory("Impl_A2");
    implA2 = await ImplA2Factory.deploy();

    //deploy proxy
    const ProxyFactory = await hre.ethers.getContractFactory("Proxy");
    proxy = await ProxyFactory.deploy();
  });

  it("should point to an implementation contract", async () => {
    await proxy.setImplementation(implA.address);
    expect(await proxy.getImplementation()).to.eq(implA.address);
  });

  it("should point to v1 of implementation contract and then to the v2 of implementation contract", async () => {
    await proxy.setImplementation(implA.address);
    await proxy.setImplementation(implA2.address);
    expect(await proxy.getImplementation()).to.eq(implA2.address);
  });

  it("should set the num state variable in v1", async () => {
    await proxy.setImplementation(implA.address);
    const proxied = new ethers.Contract(proxy.address, abi, owner);
    await proxied.setNum(3, { gasLimit: 200000 });

    //get value
    const val = await proxied.getNum();
    expect(val.toNumber()).to.eq(3);
  });

  it("should set the value of num in v1, change to v2 and set the value of num", async () => {
    const proxied = new ethers.Contract(proxy.address, abi, owner);
    //set the value of num in v1
    await proxy.setImplementation(implA.address);
    await proxied.setNum(3, { gasLimit: 200000 });

    //set the value of num in v2
    await proxy.setImplementation(implA2.address);
    await proxied.setNum(3, { gasLimit: 200000 });

    //get value
    const val = await proxied.getNum();
    expect(val.toNumber()).to.eq(9);
  });
});
