from brownie import Marketplace, accounts, network, config
from scripts.helpful_scripts import (
    get_account,
    fund_with_link,
    get_publish_source,
    copy_brownie_config_to_frontend,
    copy_folders_to_frontend,
)


def deploy():
    account = get_account()
    marketplace = Marketplace.deploy({"from": account})
    print(f"marketplace address = {marketplace.address}")
    return marketplace


def main(update_front_end=True):
    deploy()
    if update_front_end:
        copy_brownie_config_to_frontend()
        copy_folders_to_frontend("../build", "../../frontend/src/build")
