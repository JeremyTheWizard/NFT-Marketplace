import { Label, Modal, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsPlusCircleFill } from "react-icons/bs";
import SecondaryButton from "../SecondaryButton";

const Attribute = ({ index, remove, setCreateAttributesDic }) => {
  const setType = (e) => {
    setCreateAttributesDic((createAttributesDic) => {
      let createAttributesDicCopy = [...createAttributesDic];
      createAttributesDicCopy = createAttributesDicCopy.map((attribute) => {
        if (attribute.key === index) {
          attribute.trait_type = e.target.value;
          return attribute;
        }
        return attribute;
      });
      return createAttributesDicCopy;
    });
  };

  const setValue = (e) => {
    setCreateAttributesDic((createAttributesDic) => {
      let createAttributesDicCopy = [...createAttributesDic];
      createAttributesDicCopy = createAttributesDicCopy.map((attribute) => {
        if (attribute.key === index) {
          attribute.value = e.target.value;
          return attribute;
        }
        return attribute;
      });
      return createAttributesDicCopy;
    });
  };

  return (
    <div className="flex gap-3">
      <div className="flex items-center gap-1">
        <div onClick={() => remove(index)} className="cursor-pointer">
          <AiOutlineClose size="18px" />
        </div>
        <Label htmlFor="collection" />
        <TextInput
          id="collection"
          className="dark:border-gray-500 dark:bg-gray-600"
          placeholder="character"
          type="text"
          required={true}
          onChange={(e) => setType(e)}
        />
      </div>
      <div>
        <Label htmlFor="name" />
        <TextInput
          id="name"
          className="dark:border-gray-500 dark:bg-gray-600"
          placeholder="male"
          type="text"
          required={true}
          onChange={(e) => setValue(e)}
        />
      </div>
    </div>
  );
};

const AttributesModal = ({ setCreateAttributes }) => {
  const [show, setShow] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [createAttributesDic, setCreateAttributesDic] = useState([
    { key: 0, trait_type: null, value: null },
  ]);

  useEffect(() => {
    setAttributes([
      <Attribute
        key={0}
        index={0}
        remove={() => {}}
        setCreateAttributesDic={setCreateAttributesDic}
      />,
    ]);
  }, []);

  const displayPopup = () => {
    setShow(true);
  };

  const closePopup = () => {
    setShow(false);
  };

  const addProperty = () => {
    setCreateAttributesDic((createAttributesDic) => [
      ...createAttributesDic,
      { key: createAttributesDic.length, trait_type: null, value: null },
    ]);

    setAttributes((attributes) => {
      return [
        ...attributes,
        <Attribute
          key={attributes.length}
          index={attributes.length}
          remove={eliminateProperty}
          setCreateAttributesDic={setCreateAttributesDic}
        />,
      ];
    });
  };

  const eliminateProperty = (index) => {
    setAttributes((attributes) => {
      return attributes.filter(
        (attribute) => attribute.key !== index.toString()
      );
    });

    setCreateAttributesDic((createAttributesDic) => {
      return createAttributesDic.filter((attribute) => attribute.key !== index);
    });
  };

  const save = (e) => {
    e.preventDefault();
    setCreateAttributes(createAttributesDic);
    closePopup();
  };

  return (
    <>
      <button type="button" onClick={displayPopup} className="text-2xl ">
        <div className="flex gap-1 items-center">
          <BsPlusCircleFill />
          <p className="text-sm">Add attributes</p>
        </div>
      </button>
      <Modal show={show} size="md" popup={true} onClose={closePopup}>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={save}>
            <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Add Attributes
              </h3>
              <p>
                Attributes show how special your NFT is. They will be displayed
                underneath your item
              </p>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 text-center">
                  <p>Type</p>
                  <p>Name</p>
                </div>
                {attributes}
              </div>

              <button type="button" onClick={addProperty} className="text-2xl ">
                <div className="flex gap-1 items-center">
                  <BsPlusCircleFill />
                  <p className="text-sm">Add attribute</p>
                </div>
              </button>
              <SecondaryButton type="button" onClick={save}>
                Save
              </SecondaryButton>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AttributesModal;
