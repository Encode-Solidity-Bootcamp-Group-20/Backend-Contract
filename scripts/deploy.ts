import { ethers } from "ethers";
import "dotenv/config";
import * as NFTCollectionGroup20 from "../artifacts/contracts/NFTCollectionGroup20.sol/NFTCollectionGroup20.json";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
const EXPOSED_KEY = "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main() {
	const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
	console.log(`Using address ${wallet.address}`);

	const provider = ethers.providers.getDefaultProvider("ropsten");
	const signer = wallet.connect(provider);
	const balanceBN = await signer.getBalance();
	const balance = Number(ethers.utils.formatEther(balanceBN));

	if (balance < 0.01) {
		throw new Error("Not enough ether");
	}

	console.log("Deploying NFT contract...");
	const NFTFactory = new ethers.ContractFactory(NFTCollectionGroup20.abi, NFTCollectionGroup20.bytecode, signer);
	const NFTContract = await NFTFactory.deploy();
	await NFTContract.deployed();
	console.log("Completed");
	console.log(`Contract deployed at ${NFTContract.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
