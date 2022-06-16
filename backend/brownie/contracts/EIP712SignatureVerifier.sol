// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EIP712SignatureVerifier {
    string public constant name = "NFT Palace";
    mapping(uint256 => bool) public usedNonces;
    bytes32 public DOMAIN_SEPARATOR;

    constructor() {
        uint256 chainId;
        assembly {
            chainId := chainid()
        }

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes(name)),
                keccak256(bytes("1")),
                chainId,
                address(this)
            )
        );
    }

    function verifySignature(
        address _signer,
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        uint256 _price,
        address _tokenContractAddress,
        uint256 _tokenId,
        uint256 _nonce
    ) internal returns (bool) {
        require(!usedNonces[_nonce]);
        usedNonces[_nonce] = true;

        bytes32 message = keccak256(
            abi.encode(
                keccak256(
                    "Signature(uint64 price,address tokenContractAddress,uint64 tokenId,uint64 nonce)"
                ),
                _price,
                _tokenContractAddress,
                _tokenId,
                _nonce
            )
        );

        bytes32 digest = keccak256(
            abi.encodePacked("\x19\x01", DOMAIN_SEPARATOR, message)
        );
        address recovered = ecrecover(digest, _v, _r, _s);
        return _signer != address(0) && _signer == recovered;
    }
}
