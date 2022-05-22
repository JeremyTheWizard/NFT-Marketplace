import React, { useState } from "react";

function TopCollections() {
  function importAll(r) {
    let images = {};
    r.keys().map((item) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../photos/TopCollecionts", false, /\.(png|jpe?g|svg)$/)
  );

  const [topColletionSelected, setTopCollectionSelected] = useState("hidden");

  return (
    <>
      <div className="mx-auto mt-9">
        <h1 className="mb-2 text-2xl md:text-3xl font-semibold">
          Top Collections
        </h1>
      </div>
      <div className="overflow-hidden md:w-11/12 mx-auto flex">
        <div className="flex .nimate-auto-slide hover:pause overflow-visible relative">
          <div
            className="h-60 w-60 pl-4 py-4 z-20"
            onMouseEnter={(e) => {
              setTopCollectionSelected("visible");
            }}
            onMouseLeave={(e) => {
              setTopCollectionSelected("hidden");
            }}
          >
            <img
              src={images["nft1.jpeg"]}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className={`${topColletionSelected} flex w-[545px] h-60 bg-slate-300 absolute z-10`}
          >
            <div className="h-60 w-60 shrink-0 pl-4 py-4"></div>
            <div className="flex flex-col m-4">
              <h1 className="text-xl font-semibold mb-3">NFT Name</h1>
              <p className="text-left">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deserunt, deleniti repellendus
              </p>
            </div>
          </div>

          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft2.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)] "
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft3.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft4.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft5.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft6.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft7.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft8.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft9.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft10.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft1.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft2.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)] "
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft3.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft4.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft5.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft6.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft7.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft8.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft9.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
          <div className="md:hover:w-[545px] md:hover:bg-slate-300 flex pl-4 py-4">
            <h1 className="hidden text-xl font-semibold">NFT Name</h1>
            <div className="h-52 w-52">
              <img
                src={images["nft10.jpeg"]}
                alt=""
                className="h-full w-full object-cover [transform:translateZ(20px)]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopCollections;
