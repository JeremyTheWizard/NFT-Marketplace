// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract LittleMonsters is ERC721URIStorage {
    uint256 tokenCounter;

    constructor()
        ERC721("LittleMonsters", "LMS")
    {
        tokenCounter = 0;
    }

    function createCollectible(string memory _tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        tokenCounter++;
        return newItemId;
    }
}