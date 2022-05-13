import pytest
from brownie import network, Marketplace, TestToken, chain, Wei, accounts
from scripts.deploy import deploy
from scripts.helpful_scripts import (
    get_account,
    get_contract,
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
)

account = 0
marketplace = None


@pytest.fixture(scope="module")
def get_account_and_deploy():
    global account, marketplace
    account = get_account()
    marketplace = deploy()
    return account, marketplace


testToken = None


@pytest.fixture(scope="module")
def deploy_erc721():
    global testToken
    testToken = TestToken.deploy({"from": account})


def test_add_nft(get_account_and_deploy, deploy_erc721):
    testToken.approve(marketplace.address, 0)
    marketplace.addNft(testToken, 0, Wei("0.0001 ether"))
    assert marketplace.getNftToOwner(0) == account.address


def test_buy_nft(get_account_and_deploy, deploy_erc721):
    print(f"Account0 = {account}\nAccount1 = {accounts[1]}")
    print(f"Current owner = {account}")
    new_owner = accounts[1]
    marketplace.buyNft(testToken, 0, account, new_owner, {"value": Wei("0.0001 ether")})
    print(f"New owner = {marketplace.getNftToOwner(0)}")
    assert marketplace.getNftToOwner(0) == new_owner
