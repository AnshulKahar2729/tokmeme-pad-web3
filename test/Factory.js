const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers")
const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Factory", function () {
    const FEE = ethers.parseUnits("100", 18);


    async function deployFactory() {
        const [deployer]= await ethers.getSigners();
        console.log({deployer})
        const Factory = await ethers.getContractFactory("Factory");
        const factory = await Factory.deploy(FEE);
        await factory.waitForDeployment();
        return { factory, deployer };
    }
    it("should set the fee", async function () {
        const { factory } = await loadFixture(deployFactory);

        // Check the fee
        const fee = await factory.fee();
        console.log({ fee });
        expect(fee).to.equal(FEE);
    })

    it("should set the owner", async function () {
        const { factory, deployer } = await loadFixture(deployFactory);

        // Check the owner
        const owner = await factory.owner();
        console.log({ owner });
        expect(owner).to.equal(deployer.address);
    })

    
})
