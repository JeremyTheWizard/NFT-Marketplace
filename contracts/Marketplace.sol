// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Imports
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Marketplace {
    // Variables
    struct nftData {
        address owner;
        uint256 price;
    }
    mapping(uint256 => address) nftToOwner;
    mapping(address => mapping(uint256 => nftData)) ownerToNfts;
    event newToken(uint256 tokenId, address owner, uint256 price);
    event purchasedToken(uint256 tokenId, address buyer, uint256 price);

    constructor() {}

    // Logic

    function addNft(
        IERC721 _nft,
        uint256 _tokenId,
        uint256 _price
    ) public {
        // Let's users add nft to the marketplace
        nftToOwner[_tokenId] = msg.sender;
        ownerToNfts[msg.sender][_tokenId] = nftData(msg.sender, _price);
        _nft.transferFrom(msg.sender, address(this), _tokenId);
        emit newToken(_tokenId, msg.sender, _price);
    }

    function buyNft(
        IERC721 _nft,
        uint256 _tokenId,
        address payable _owner,
        address _to
    ) public payable {
        uint256 price = ownerToNfts[_owner][_tokenId].price;
        require(msg.value == price);
        require(_nft.balanceOf(address(this)) > 0);
        _nft.transferFrom(address(this), _to, _tokenId);
        delete ownerToNfts[_owner][_tokenId];
        _owner.transfer(price);
        emit purchasedToken(_tokenId, _to, price);
    }

    function getNftToOwner(uint256 _tokenId) public view returns (address) {
        return nftToOwner[_tokenId];
    }
}
