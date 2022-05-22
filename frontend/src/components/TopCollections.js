import { BsFillArrowRightCircleFill } from "react-icons/bs";

function TopCollections() {
  function importAllImages(r) {
    return r.keys().map(r);
  }
  const images = importAllImages(
    require.context("../photos/TopCollecionts", false, /\.(png|jpe?g|svg)$/)
  );

  function renderTopCollectionsImages() {
    const imagesHtml = [];
    let imageIndex = 0;

    /* We loop through the images twice because if not there wourld be an empty
    space while the slide animation repeats.
    */
    for (let i = 1; i < (images.length + 1) * 2; i++) {
      if (i == 11) {
        imageIndex = 0;
      }
      imagesHtml.push(
        <div className="relative flex">
          <div
            className="h-60 w-60 pl-4 py-4"
            onMouseEnter={(e) => {
              document.getElementById(i).classList.remove("hidden");
              document.getElementById(i).classList.add("flex");
            }}
          >
            <img
              src={images[imageIndex]}
              alt=""
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div
            id={i}
            className="hidden w-[545px] h-60 rounded-xl bg-onPrimary absolute z-10"
            onMouseLeave={(e) => {
              document.getElementById(i).classList.remove("flex");
              document.getElementById(i).classList.add("hidden");
            }}
          >
            <div className="h-60 w-60 shrink-0 pl-4 py-4">
              <img
                src={images[imageIndex]}
                alt=""
                className="h-full w-full object-cover rounded-xl"
              />
            </div>
            <div className="m-4 ml-6 flex flex-col">
              <h1 className="text-left text-xl font-semibold mb-2">
                NFT Collection Name
              </h1>
              <p className="text-left break-word">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic
                debitis aliquid sapiente tempore iusto delectus maxime quos
                perspiciatis eveniet nemo!
              </p>
              <BsFillArrowRightCircleFill
                className="mt-4 place-self-end"
                size="2.5em"
                color="primary"
              />
            </div>
          </div>
        </div>
      );
      imageIndex++;
    }
    return imagesHtml;
  }

  return (
    <>
      <h1 className="mx-auto mt-12 mb-3 text-onPrimary text-2xl md:text-3xl font-bold">
        Top Collections
      </h1>
      <div className="overflow-hidden mx-auto flex">
        <div className="flex animate-auto-slide hover:pause overflow-visible relative">
          {renderTopCollectionsImages()}
        </div>
      </div>
    </>
  );
}

export default TopCollections;
