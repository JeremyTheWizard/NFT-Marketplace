from brownie import Marketplace, NFTMinter, accounts, config, network

from scripts.helpful_scripts import fund_with_link, get_account, get_publish_source
from scripts.update_frontend import (
    copy_brownie_config_to_frontend,
    copy_folders_to_frontend,
)


def deploy():
    account = get_account()
    marketplace = Marketplace.deploy(
        {"from": account},
        publish_source=config["networks"][network.show_active()]["verify"],
    )
    print(f"marketplace address = {marketplace.address}")
    nft_minter = NFTMinter.deploy(
        {"from": account},
        publish_source=config["networks"][network.show_active()]["verify"],
    )
    print(f"NFTMinter address = {nft_minter.address}")
    return [marketplace, nft_minter]


def main(update_front_end=True):
    deploy()
    if update_front_end:
        copy_brownie_config_to_frontend()
        copy_folders_to_frontend("../build", "../../../frontend/src/build")
