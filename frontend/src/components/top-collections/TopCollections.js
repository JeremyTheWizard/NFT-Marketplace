import TopCollectionsCollection from "./TopCollectionsCollection";

function TopCollections() {
  function importAllImages(r) {
    return r.keys().map(r);
  }
  const allImages = importAllImages(
    require.context("../../photos/TopCollecionts", false, /\.(png|jpe?g|svg)$/)
  );

  function renderTopCollectionsImages() {
    const imagesHtml = [];

    /* We loop through the images twice because if not there wourld be an empty
    space while the slide animation repeats.
    */
    let ii = 0;
    for (let i = 0; i <= allImages.length * 2; i++) {
      if (ii === 10) {
        ii = 0;
      }
      imagesHtml.push(<TopCollectionsCollection imagePath={allImages[ii]} />);
      ii++;
    }
    return imagesHtml;
  }

  return (
    <>
      <h1 className="mx-auto mt-12 mb-3 text-onPrimary text-2xl md:text-3xl font-bold">
        Top Collections
      </h1>
      {/* Since the app.js has a with of 90vw, when we give this component
      100vw it will set a negative margin just on the right side. This the need
      to set the left margin with the calc function.*/}
      <div className="overflow-hidden mx-auto flex w-[100vw] md:w-full relative md:static left-[calc(-50vw+50%)]">
        <div className="flex animate-auto-slide hover:pause overflow-visible relative">
          {renderTopCollectionsImages()}
        </div>
      </div>
    </>
  );
}

export default TopCollections;
