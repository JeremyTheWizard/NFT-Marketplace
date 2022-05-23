import { shuffleArray } from "../helpfulScripts";
import randomPerson from "../photos/random-person.jpeg";
import ExploreCard from "./ExploreCard";

function NftsCards() {
  function importAllImages(r) {
    return r.keys().map(r);
  }
  const allNfts = shuffleArray(
    importAllImages(
      require.context("../photos/Collections/", true, /\.(png|jpe?g|svg)$/)
    )
  );

  function renderExploreCards() {
    const nftsCardsHtml = [];
    for (let i = 0; i < allNfts.length; i++) {
      nftsCardsHtml.push(
        <ExploreCard imagePath={allNfts[i]} owner={randomPerson} />
      );
    }
    return nftsCardsHtml;
  }

  return (
    <div className="mt-12">
      <h1 className="mb-7 text-2xl font-bold md:text-3xl text-onPrimary">
        Explore
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {renderExploreCards()};
      </div>
    </div>
  );
}

export default NftsCards;
