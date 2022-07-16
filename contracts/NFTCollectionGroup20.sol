// SPDX-License-Identifier: MIT

// ********** WORK IN PROGRESS **********

pragma solidity ^0.8.4;

//import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract NFTCollectionGroup20 is ERC721URIStorage, ERC721Burnable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;
    string[] metadata = [
        "https://ipfs.io/ipfs/QmWmxTKkivEFqRvsFPSJTP1hHQnRFC4LVFfQ32yV1taND1?filename=Camaro.json",
        "https://ipfs.io/ipfs/QmSLP8FYdZiudRw6CMcJJsPesXjHAA8JiYhQdAPuLpdZKP?filename=Mclaren.json",
        "https://ipfs.io/ipfs/QmdcCa8b1cbgM65ELJK2CdjEz96b9Hk6s1duLLAL41zUJY?filename=Ferrari.json",
        "https://ipfs.io/ipfs/Qmdz9vXqxH9GrxPpuikx6PrUuAZL7aAg1jJ7GQHmtMsJ63?filename=Mustang.json",
        "https://ipfs.io/ipfs/QmYzbb9KJYEhb65JNRP45v3LajzSNqk1wByot2FDvvjYAb?filename=Ferrari-2.json",
        "https://ipfs.io/ipfs/QmWHdkxkxagVXq4r5ykSs5k1n4PBHPQ221Lq5N71Fk8yv1?filename=Mclaren-P1.json",
        "https://ipfs.io/ipfs/Qmf7ULTdEZs8JxoH9skaJoGa4SC4udJk8LFqYa9xG8nK4i?filename=Ferrari-458.json",
        "https://ipfs.io/ipfs/QmYE1BV5D7NT9QNLDGgvSoyYoaPcK6Kf5rjo3dQqwYbUCq?filename=Mclaren-P1-8.json",
        "https://ipfs.io/ipfs/QmbRRfTMrLijZXsa3DmxWFjp5vwELcHYnnWkMY6DTm45yz?filename=Ferrari-berlinet.json",
        "https://ipfs.io/ipfs/QmWmxTKkivEFqRvsFPSJTP1hHQnRFC4LVFfQ32yV1taND1?filename=Camaro.json"
    ];

    uint256 private priceNFT; // Price to Sell/buy the NFT

    address public owner;

    // event to tell the API we mint an NFT succesfully
    event NewNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721("NFTCollectionGroup20", "NCG20") {
        owner = msg.sender;
        priceNFT = 0.001 ether; // price by default, the user can change the price later with setPriceNFT
    }

    // function to mint an NFT
    function MintNFT() public {
        _tokenIdCounter.increment(); // increment the NFT number by 1
        uint256 tokenId = _tokenIdCounter.current(); // get the number of the NFT
        require(tokenId <= 10, "The Max number of NFT were minted"); // check that only 10 NFTs can be minted

        _safeMint(msg.sender, tokenId); // mint the NFT to the caller of the function
        _setTokenURI(tokenId, metadata[tokenId - 1]); // Set the metadata json as token uri

        console.log(
            "An NFT w/ ID %s has been minted to %s",
            tokenId,
            msg.sender
        );
        emit NewNFTMinted(msg.sender, tokenId); // emit the event to tell API and FE we minted an NFT successfully
    }

    // *************** functions to permit to buy/sell an NFT ***************

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
