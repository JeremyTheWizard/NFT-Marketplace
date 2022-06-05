import pytest
from brownie import (
    network,
    Marketplace,
    TestToken,
    TestToken2,
    chain,
    Wei,
    accounts,
    exceptions,
)
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


test_tokens = []


@pytest.fixture(scope="module")
def deploy_test_tokens():
    global test_tokens
    test_tokens = [
        TestToken.deploy({"from": account}),
        TestToken2.deploy({"from": accounts[1]}),
    ]


def test_add_nft(get_account_and_deploy, deploy_test_tokens):
    # test_tokens[0].approve(marketplace.address, 0)
    marketplace.addNft(test_tokens[0], 0, Wei("0.0001 ether"))
    assert marketplace.getNftToOwner(test_tokens[0], 0) == account.address


def test_add_nft_not_from_owner(get_account_and_deploy, deploy_test_tokens):
    with pytest.raises(exceptions.VirtualMachineError):
        marketplace.addNft(test_tokens[1], 0, Wei("0.0001 ether"))
    print(f"nft owner = {marketplace.getNftToOwner(test_tokens[1], 0)}")


def test_buy_nft(get_account_and_deploy, deploy_test_tokens):
    print(f"Account0 = {account}\nAccount1 = {accounts[1]}")
    print(f"Current owner = {account}")
    new_owner = accounts[1]
    marketplace.buyNft(
        test_tokens[0], 0, account, new_owner, {"value": Wei("0.0001 ether")}
    )
    print(f"New owner = {marketplace.getNftToOwner(test_tokens[0], 0)}")
    assert marketplace.getNftToOwner(test_tokens[0], 0) == new_owner
