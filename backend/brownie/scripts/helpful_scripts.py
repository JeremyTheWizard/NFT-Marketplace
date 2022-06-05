from brownie import ERC721, network, accounts, config, web3, Contract
import os
import time
import yaml
import json
import shutil

# Set a default gas price
from brownie.network import priority_fee

NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["hardhat", "development", "ganache"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS + [
    "mainnet-fork",
    "binance-fork",
    "matic-fork",
]

# Import contract to mock and set a dictionary: {"name": contract}
contract_to_mock = {"ERC721": ERC721}


def get_account(index=None, id=None):
    """Gets the actual account on the working network. Prioritizes Index and Id if passed.
    If you want to work with a test net, add it to brownie-config.yaml under 'networks'"""
    if index:
        return accounts[index]
    elif network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    elif id:
        return accounts.load(id)
    elif network.show_active() in config["networks"]:
        return accounts.add(config["wallets"]["from_key"])
    else:
        return None


def get_contract(contract_name):
    """If you want to use this function, go to the brownie config and add a new entry for
    the contract that you want to be able to 'get'. Then add an entry in the in the variable 'contract_to_mock'.
        This script will then either:
            - Get a address from the config
            - Or deploy a mock to use for a network that doesn't have it
        Args:
            contract_name (string): This is the name that is refered to in the
            brownie config and 'contract_to_mock' variable.
        Returns:
            brownie.network.contract.ProjectContract: The most recently deployed
            Contract of the type specificed by the dictonary. This could be either
            a mock or the 'real' contract on a live network.
    """
    contract_type = contract_to_mock[contract_name]

    if network.show_active() in NON_FORKED_LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        if len(contract_type) <= 0:
            deploy_mocks(contract_name)
        contract = contract_type[-1]
    else:
        try:
            contract_address = config["networks"][network.show_active()][contract_name]
            contract = Contract.from_abi(
                contract_type._name, contract_address, contract_type.abi
            )
        except KeyError:
            print(
                f"{network.show_active()} address not found, perhaps you should add it to the config or deploy mocks?"
            )
            print(
                f"brownie run scripts/deploy_mocks.py --network {network.show_active()}"
            )
    return contract


def get_publish_source():
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS or not os.getenv(
        "ETHERSCAN_TOKEN"
    ):
        return False
    else:
        return True


def fund_with_link(
    contract_address, account=None, link_token=None, amount=1000000000000000000
):
    account = account if account else get_account()
    link_token = link_token if link_token else get_contract("link_token")
    tx = interface.LinkTokenInterface(link_token).transfer(
        contract_address, amount, {"from": account}
    )
    print(f"Funded {contract_address}")
    return tx


def get_verify_status():
    verify = (
        config["networks"][network.show_active()]["verify"]
        if config["networks"][network.show_active()].get("verify")
        else False
    )
    return verify


def deploy_mocks(decimals=18, initial_value=2000):
    """
    Use this script if you want to deploy mocks to a testnet
    """
    # Set a default gas price
    # priority_fee("1 gwei")
    print(f"The active network is {network.show_active()}")
    print("Deploying Mocks...")
    account = get_account()
    print(f"account = {account}")
    # Rest of logic...
    # x.deploy({"from":account})
    ERC721.deploy("Test", "TS", {"from": account})
    print("Mocks Deployed")


def listen_for_event(brownie_contract, event, timeout=200, poll_interval=2):
    """Listen for an event to be fired from a contract.
    We are waiting for the event to return, so this function is blocking.
    Args:
        brownie_contract ([brownie.network.contract.ProjectContract]):
        A brownie contract of some kind.
        event ([string]): The event you'd like to listen for.
        timeout (int, optional): The max amount in seconds you'd like to
        wait for that event to fire. Defaults to 200 seconds.
        poll_interval ([int]): How often to call your node to check for events.
        Defaults to 2 seconds.
    """
    web3_contract = web3.eth.contract(
        address=brownie_contract.address, abi=brownie_contract.abi
    )
    start_time = time.time()
    current_time = time.time()
    event_filter = web3_contract.events[event].createFilter(fromBlock="latest")
    while current_time - start_time < timeout:
        for event_response in event_filter.get_new_entries():
            if event in event_response.event:
                print("Found event!")
                return event_response
        time.sleep(poll_interval)
        current_time = time.time()
    print("Timeout reached, no event found.")
    return {"event": None}


def copy_brownie_config_to_frontend():
    print("Updating frontend...")
    with open("../brownie-config.yaml") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open(
            "../../../frontend/src/brownieConfig.json", "w"
        ) as brownie_config_json:
            json.dump(config_dict, brownie_config_json)
    print("Frontend updated!")


def copy_folders_to_frontend(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    copy_brownie_config_to_frontend()
    copy_folders_to_frontend("../build", "../../../frontend/src/build")
