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
	});

	describe("Testing the MintNFT function to see if we mint an NFT successfully", async function () {
		it("checking the _safeMint emit the Transfer event", async function () {
			await expect(NFTcontract.MintNFT()).to.emit(NFTcontract, "Transfer");
		});
		it("checking the MintNFT emit the NewNFTMinted event", async function () {
			await expect(NFTcontract.MintNFT()).to.emit(NFTcontract, "NewNFTMinted").withArgs(accounts[0].address, 1);
		});
		it("testing the mapping is assigned correctly", async function () {
			await NFTcontract.MintNFT();
			const price = ethers.utils.formatEther(await (await NFTcontract.idNFT_SellNFT(1)).price);
			const add = await (await NFTcontract.idNFT_SellNFT(1)).ownerNFT;
			const tokenid = (await NFTcontract.idNFT_SellNFT(1)).tokenId;
			expect(price).to.eq("0.001");
			expect(add).to.eq(accounts[0].address);
			expect(tokenid).to.eq(1);
		});
	});

	describe("Testing the SetPriceNFT Functions...", async function () {
		it("testing call is revert with 0", async function () {
			await expect(NFTcontract.SetPriceNFT(0, 1)).to.be.revertedWith("The Price has to be more than 0");
		});
		it("Testing if the function revert when the caller is not the owner of the NFT", async function () {
			await NFTcontract.MintNFT();
			const price = ethers.utils.parseUnits("0.01", "ether");
			await expect(NFTcontract.connect(accounts[1]).SetPriceNFT(price, 1)).to.be.revertedWith("You're not the owner of the NFT");
		});
		it("Testing if the Price was set correctly", async function () {
			await NFTcontract.MintNFT();
			const priceBefore = await ethers.utils.formatEther((await NFTcontract.idNFT_SellNFT(1)).price);
			// Testing price before the change
			await expect(priceBefore).to.eq(ethers.utils.formatEther((await NFTcontract.idNFT_SellNFT(1)).price));
		});
		it("testing setPrice change the price correctly", async function () {
			await NFTcontract.MintNFT();
			await NFTcontract.SetPriceNFT(1, 1);
			await expect(1).to.eq((await NFTcontract.idNFT_SellNFT(1)).price);
		});
	});

	describe("Testing the getPrice function...", async function () {
		it("Testing if we get the price when the getPrice function is called.", async function () {
			await NFTcontract.MintNFT();
			const price = ethers.utils.formatEther(await NFTcontract.getPriceNFT(1));
			expect(price).to.eq("0.001");
		});
		it("Testing if the getPrice function gets the price correctly after a change in price", async function () {
			await NFTcontract.MintNFT();
			const price = 1;
			await NFTcontract.SetPriceNFT(price, 1);
			await expect(price).to.eq(await NFTcontract.getPriceNFT(1));
		});
	});

	describe("Testing BuyNFT function.", async function () {
		it("Testing the contract revert the transaction if the ether send to the function is not enough", async function () {
			await NFTcontract.MintNFT();
			await expect(NFTcontract.BuyNFT(1, { value: ethers.utils.parseEther("0.01") })).to.be.revertedWith("You have to pay the right Price");
		});
		it();
	});
});
