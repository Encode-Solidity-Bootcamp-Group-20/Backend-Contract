import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
	solidity: "0.8.9",
	paths: { tests: "tests" },
	networks: {
		ropsten: {
			url: process.env.ROPSTEN_URL || "",
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
		},
	},
};

export default config;
