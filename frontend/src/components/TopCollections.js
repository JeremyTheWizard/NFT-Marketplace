import React from "react";

function TopCollections() {
  function importAll(r) {
    let images = {};
    r.keys().map((item) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../photos", false, /\.(png|jpe?g|svg)$/)
  );

  return (
    <section>
      <div className="mx-auto mt-5">
        <h1 className="mb-3 text-xl font-semibold">Top Collections</h1>
      </div>
      <div className="overflow-hidden">
        <div className="w-[calc(160*10)] flex space-x-5 animate-auto-slide relative hover:pause">
          <img
            src={images["nft1.jpeg"]}
            alt=""
            className="object-cover shrink-0 h-40 w-40 "
          />
          <img
            src={images["nft2.jpeg"]}
            alt=""
            className="object-cover shrink-0 h-40 w-40 "
          />
          <img
            src={images["nft3.jpeg"]}
            alt=""
            className="object-cover shrink-0 h-40 w-40"
          />
          <img
            src={images["nft4.jpeg"]}
            alt=""
            className="object-cover shrink-0 h-40 w-40"
          />
          <img
            src={images["nft5.jpeg"]}
            alt=""
            className="object-cover shrink-0 h-40 w-40"
          />
          <img
            src={images["nft6.jpeg"]}
            alt=""
            className="object-cover shrink-0 h-40 w-40"
          />
          <img
            src={images["nft7.jpeg"]}
            alt=""
            className="object-cover shrink-0 h-40 w-40"
          />
          <img
            src={images["nft8.jpeg"]}
            alt=""
            className="object-cover shrink-0 h-40 w-40"
          />
          <img
            src={images["nft9.jpeg"]}
            alt=""
            className="object-cover shrink-0 h-40 w-40"
          />
          <img
            src={images["nft10.jpeg"]}
            alt=""
            className="object-cover shrink-0 h-40 w-40"
          />
        </div>
      </div>
    </section>
  );
}

export default TopCollections;
