const hre = require("hardhat");

async function main() {
  // We get the contract to deploy V1
  const ImplAFactory = await hre.ethers.getContractFactory("Impl_A");
  const implA = await ImplAFactory.deploy();

  //deploy proxy
  const ProxyFactory = await hre.ethers.getContractFactory("Proxy");
  const proxy = await ProxyFactory.deploy();

  //set contract V1 as implementation address
  await proxy.setImplementation(implA.address);
  //set num
  await proxy.setNum(10);

  console.log("\n");
  //output the current state of the contract before upgrade
  console.log("Contract address of V1", await proxy._implementation());
  console.log("Value of num in Implementation V1 contract", await proxy.num());
  console.log("Sender in Implementation V1 contract", await proxy.sender());

  //deploy V2
  const ImplA2Factory = await hre.ethers.getContractFactory("Impl_A2");
  const implA2 = await ImplA2Factory.deploy();

  //set the implementation contract to V2
  await proxy.setImplementation(implA2.address);
  //set num again
  await proxy.setNum(10);

  console.log("\n*****V2******\n");

  //output the current state of the contract after upgrade
  console.log("Contract address of V2", await proxy._implementation());
  console.log("Value of num in Implementation V2 contract", await proxy.num());
  console.log("Sender in Implementation V2 contract", await proxy.sender());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
