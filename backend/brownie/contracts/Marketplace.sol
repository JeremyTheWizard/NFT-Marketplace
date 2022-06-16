// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// Imports
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./EIP712SignatureVerifier.sol";

contract Marketplace is EIP712SignatureVerifier {
    event purchasedToken(
        address tokenContractAddress,
        uint256 tokenId,
        address seller,
        address buyer,
        uint256 price
    );

    function buyNft(
        address payable _signer,
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        uint256 _price,
        address _tokenContractAddress,
        uint256 _tokenId,
        uint256 _nonce
    ) public payable {
        require(
            verifySignature(
                _signer,
                _v,
                _r,
                _s,
                _price,
                _tokenContractAddress,
                _tokenId,
                _nonce
            ),
            "Signature is incorrect!"
        );
        require(msg.value == _price, "Payment is not enough!");
        IERC721(_tokenContractAddress).transferFrom(
            _signer,
            msg.sender,
            _tokenId
        );
        _signer.transfer(_price);
        emit purchasedToken(
            _tokenContractAddress,
            _tokenId,
            _signer,
            msg.sender,
            _price
        );
    }
}
