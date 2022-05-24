import React from "react";
import { useParams, useLocation } from "react-router-dom";
import testImage from "../../photos/testImage.jpeg";

function CollectionIntro() {
  const { collectionname } = useParams();
  const location = useLocation();

  return (
    <div className="w-full">
      <div>
        <img
          src={testImage}
          alt=""
          className="w-full h-32 md:h-48 lg:h-64 object-cover"
        />
        <img
          src={location.state.imagePath}
          alt=""
          className="w-24 h-24 md:w-36 md:h-36 rounded-full object-cover relative -top-12 mb-[-10px]"
        />
      </div>
      <div className="flex flex-col gap-8">
        <h2 className="text-onPrimary text-2xl md:text-3xl font-bold">
          {collectionname.charAt(0).toUpperCase() + collectionname.slice(1)}
        </h2>
        <div className="grid lg:grid-cols-2 justify-center gap-12">
          <p className="text-onPrimary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione ex
            aperiam hic recusandae enim unde voluptatibus ad, qui eaque fugit
            sed perferendis, repellat numquam consequatur distinctio officiis,
            nulla explicabo natus iusto eveniet debitis obcaecati at. Rem error
            odio assumenda debitis, laudantium explicabo provident,
            necessitatibus sapiente dolorum nemo nihil impedit obcaecati.
          </p>

          <div className="flex self-start justify-around p-3 text-onPrimary border-2 border-buttonSecondary rounded-xl">
            <div className="div flex flex-col gap-3 items-center">
              <p className="md:text-xl font-semibold">Items</p>
              <p className="md:text-xl">8</p>
            </div>
            <div className="div flex flex-col gap-3 items-center">
              <p className="md:text-xl font-semibold">Owners</p>
              <p className="md:text-xl">3</p>
            </div>
            <div className="div flex flex-col gap-3 items-center">
              <p className="md:text-xl font-semibold">Floor Price</p>
              <p className="md:text-xl">0.03</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CollectionIntro;
