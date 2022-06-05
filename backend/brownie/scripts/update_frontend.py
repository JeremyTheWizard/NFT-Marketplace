import yaml, os, shutil, json


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


if __name__ == "__main__":
    main()
