import { shuffleArray } from "../helpfulScripts";
import { BsFillSuitHeartFill } from "react-icons/bs";
import randomPerson from "../photos/random-person.jpeg";

function NftsCards() {
  function importAllImages(r) {
    return r.keys().map(r);
  }
  const allNfts = shuffleArray(
    importAllImages(
      require.context("../photos/Collections/", true, /\.(png|jpe?g|svg)$/)
    )
  );

  function renderNftCards() {
    const nftsCardsHtml = [];
    for (let i = 0; i < allNfts.length; i++) {
      nftsCardsHtml.push(
        <div className="bg-onPrimary overflow-hidden rounded-xl flex flex-col cursor-pointer">
          <div className="w-full">
            <img
              src={allNfts[i]}
              alt=""
              className="w-full h-full object-cover aspect-square"
            />
          </div>
          <div className="p-6 flex flex-col">
            <h3 className="text-xl font-semibold text-left mb-3">NFT Name</h3>
            <p className="text-left text-xl font-semibold mb-3">$337</p>
            <p className="text-left mb-12">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
              eius inventore mollitia ipsum. Autem voluptatum ducimus quisquam
              cupiditate eius eum!
            </p>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={randomPerson}
                  alt=""
                  className="w-8 h-8 bg-gray-500 object-cover rounded-full"
                />
                <h4 className="text-base">Creator Name</h4>
              </div>
              <div className="flex gap-2 items-center">
                <BsFillSuitHeartFill size="32px" />
                <p className="text-base">32</p>
              </div>
            </div>
          </div>
        </div>
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
        {renderNftCards()};
      </div>
    </div>
  );
}

export default NftsCards;
