import os
from string import Template


def create_erc721_contract(path_to, file_name, contract_name, token_name, token_symbol):
    with open("./txt_templates/ERC721_template.txt", "r") as f:
        t = Template(f.read())

    t = t.substitute(
        contract_name=contract_name, token_name=token_name, token_symbol=token_symbol
    )

    with open(f"{path_to}/{file_name}.sol", "w") as nf:
        nf.write(t)


def main():
    create_erc721_contract(
        "../contracts/collections", "AlmostHuman", "AlmostHuman", "AlmostHuman", "ALN"
    )
