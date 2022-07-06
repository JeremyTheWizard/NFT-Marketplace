import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { useEthers } from "@usedapp/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useGetNFTMinterContract from "../../hooks/useGetNFTMinterContract";
import ModifiedCircularProgress from "../ModifiedMuiComponents/ModifiedCircularProgress";
import ModifiedTextField from "../ModifiedTextField";
import CreateCollectionDialog from "./CreateCollectionDialog";

const filter = createFilterOptions();

const CollectionComboBox = () => {
  const [value, setValue] = React.useState(null);
  const [openCreateCollectionDialog, setOpenCreateCollectionDialog] =
    useState(false);
  const [openAutocompleteOptions, setOpenAutocompleteOptions] = useState(false);
  const [userCollections, setUserCollections] = useState();

  const nftPalaceContractAddress = useGetNFTMinterContract().address;
  const { account } = useEthers();

  const loading = openAutocompleteOptions && !userCollections;

  const fetchUserCollections = async () => {
    const response = await axios({
      method: "get",
      url: `http://localhost:8000/api/users/user/${account}`,
    });
    setUserCollections(response.data.user.collectionsCreated);
  };

  useEffect(() => {
    if (account) {
      let active = true;

      if (!loading) {
        return undefined;
      }
      (async () => {
        if (active) {
          await fetchUserCollections();
        }
      })();

      return () => {
        active = false;
      };
    }
  }, [account, loading]);

  useEffect(() => {
    if (!openAutocompleteOptions) {
      setUserCollections(undefined);
    }
  }, [openAutocompleteOptions]);

  return (
    <>
      <Autocomplete
        open={openAutocompleteOptions}
        onOpen={() => {
          setOpenAutocompleteOptions(true);
        }}
        onClose={() => {
          setOpenAutocompleteOptions(false);
        }}
        loading={loading}
        value={value}
        ListboxProps={{
          sx: { "& li:first-child": { fontWeight: "bold" } },
        }}
        // Avoid isOptionEqualToValue warnings
        isOptionEqualToValue={(option, value) => option.id === value.id}
        onChange={(_, newValue) => {
          if (
            newValue &&
            newValue.name &&
            newValue.name === "+ Create new collection"
          ) {
            setOpenCreateCollectionDialog(true);
          } else if (typeof newValue === "string") {
            setValue({
              name: newValue,
            });
          } else if (newValue && newValue.inputValue) {
            axios.post("http://localhost:8000/api/collections/collection", {
              account: account,
              collectionName: newValue.inputValue,
              assetContractAddress: nftPalaceContractAddress, // All tokens created by users use the NFT Palace contract
            });
            // Create a new value from the user input
            setValue({
              name: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some(
            (option) => inputValue === option.name
          );
          if (filtered.length === 0) {
            if (
              !loading &&
              ((userCollections && userCollections.length) || inputValue)
            ) {
              filtered.shift();
              filtered.push({
                inputValue,
                name: `Create collection "${inputValue}"`,
                description:
                  "This is a quick creation. You'll be able to fill the collection's details later on your profile.",
              });
              return filtered;
            }
          }

          return [
            {
              name: "+ Create new collection",
              style: { fontWeight: "bold" },
            },
            ...filtered,
          ];
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="collection-autocomplete"
        options={userCollections ? userCollections : []}
        getOptionLabel={(option) => {
          // Value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Add "xxx" option created dynamically
          if (option.inputValue) {
            return option.inputValue;
          }
          // Regular option
          return option.name;
        }}
        renderOption={(props, option) => {
          return (
            <li
              {...props}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <p>{option.name}</p>
              <p className="text-sm font-normal">{option.description}</p>
            </li>
          );
        }}
        renderInput={(params) => (
          <ModifiedTextField
            {...params}
            required
            label="Collection"
            name="collection"
            id="collection"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <ModifiedCircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <CreateCollectionDialog
        setValue={setValue}
        open={openCreateCollectionDialog}
        setOpenCreateCollectionDialog={setOpenCreateCollectionDialog}
      />
    </>
  );
};

export default CollectionComboBox;
