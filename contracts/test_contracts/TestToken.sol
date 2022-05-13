// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TestToken is ERC721 {
    address private owner;

    constructor() ERC721("Token", "TK") {
        owner = msg.sender;
        _safeMint(owner, 0);
    }
}
