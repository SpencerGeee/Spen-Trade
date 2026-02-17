import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.28",
    networks: {
        hardhat: {},
        // sepolia: { ... } // Add when needed
    },
    paths: {
        sources: "./contracts",
        tests: "./test/contracts",
        cache: "./cache",
        artifacts: "./artifacts"
    }
};

export default config;
