const hre = require("hardhat");

async function main() {
  // We get the contract to deploy V1
  const ImplAFactory = await hre.ethers.getContractFactory("Impl_A");
  const implA = await ImplAFactory.deploy();
  await implA.deployed();
  console.log("Implemenation contract V1 address", implA.address);

  //deploy V2
  const ImplA2Factory = await hre.ethers.getContractFactory("Impl_A2");
  const implA2 = await ImplA2Factory.deploy();
  console.log("Implemenation contract V2 address", implA2.address);

  //deploy proxy
  const ProxyFactory = await hre.ethers.getContractFactory("Proxy");
  const proxy = await ProxyFactory.deploy();
  await proxy.deployed();
  console.log("Proxy contract address", proxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
