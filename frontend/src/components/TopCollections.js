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
    <>
      <div className="mx-auto mt-5">
        <h1 className="mb-3 text-xl font-semibold">Top Collections</h1>
      </div>
      <div className="overflow-hidden md:w-11/12 mx-auto flex">
        <div className="gap-x-5 flex animate-auto-slide hover:pause">
          <div className="h-40 w-40 [perspective:100px] hover:[z-index:9999]">
            <img
              src={images["nft1.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft2.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)] "
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft3.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft4.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft5.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft6.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft7.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft8.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft9.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft10.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft1.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft2.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)] "
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft3.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft4.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft5.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft6.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft7.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft8.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft9.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
          <div className="h-40 w-40 [perspective:100px] md:hover:[z-index:9999]">
            <img
              src={images["nft10.jpeg"]}
              alt=""
              className="h-full w-full object-cover md:hover:[transform:translateZ(20px)]"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default TopCollections;
