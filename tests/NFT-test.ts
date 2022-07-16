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
		/*	it("Testing the Price assignation", async function () {
			const price = ethers.utils.formatEther(await NFTcontract.priceNFT());
			expect(price).to.eq("0.001");
			});
		*/
	});

	describe("Testing the mintNFT function to see if we mint an NFT successfully", async function () {
		it("checking the _safeMint emit the Transfer event", async function () {
			await expect(NFTcontract.MintNFT()).to.emit(NFTcontract, "Transfer");
		});
		it("checking the MintNFT emit the NewNFTMinted event", async function () {
			await expect(NFTcontract.MintNFT()).to.emit(NFTcontract, "NewNFTMinted").withArgs(accounts[0].address, 1);
		});
	});

	describe("Testing the SetPriceNFT Functions...", async function () {
		it("testing call is revert with 0", async function () {
			await expect(NFTcontract.SetPriceNFT(0, 1)).to.be.revertedWith("The Price has to be more than 0");
		});
		it("Testing if the function revert when the caller is not the owner of the NFT", async function () {
			// pending: I have to mint the NFT first
			const price = ethers.utils.parseUnits("0.01", "ether");
			await expect(NFTcontract.SetPriceNFT(price, 1)).to.be.revertedWith("You're not the owner of the NFT");
		});
	});
});
