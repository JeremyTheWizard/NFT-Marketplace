from brownie import Marketplace, accounts, network, config
from scripts.helpful_scripts import get_account, fund_with_link, get_publish_source


def deploy():
    account = get_account()
    marketplace = Marketplace.deploy({"from": account})
    print(f"marketplace address = {marketplace.address}")
    return marketplace


def main():
    deploy()
