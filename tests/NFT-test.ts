import { expect } from "chai";
import { ethers } from "hardhat";
import { NFTCollectionGroup20 } from "../typechain-types/contracts/NFTCollectionGroup20";

describe("Testing NFT Contract", function () {
	let accounts: any[];
	let NFTcontract: NFTCollectionGroup20;

	beforeEach(async function () {
		accounts = await ethers.getSigners();
		const NFTFactory = await ethers.getContractFactory("NFTCollectionGroup20");
		NFTcontract = (await NFTFactory.deploy()) as NFTCollectionGroup20;
		await NFTcontract.deployed();
	});

	describe("Testing constructor deploy the contract", async function () {
		it("Checking the Owner is the deployer", async function () {
			const owner = await NFTcontract.owner();
			expect(owner).to.eq(accounts[0].address);
		});
		it("Testing the Price assignation", async function () {
			const price = ethers.utils.formatEther(await NFTcontract.priceNFT());
			expect(price).to.eq("0.001");
		});
	});

	describe("Testing the mintNFT function to see if we mint an NFT successfully", async function () {
		it("checking the _safeMint emit the Transfer event", async function () {
			await expect(NFTcontract.MintNFT()).to.emit(NFTcontract, "Transfer");
		});
		it("checking the MintNFT emit the NewNFTMinted event", async function () {
			await expect(NFTcontract.MintNFT()).to.emit(NFTcontract, "NewNFTMinted").withArgs(accounts[0].address, 1);
		});
	});

	describe("Testing the Buy Function...", async function () {
		it();
	});
});
