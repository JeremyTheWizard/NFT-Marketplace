import Explore from "../components/explore/Explore";
import TopCollections from "../components/top-collections/TopCollections";

function Home() {
  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto mb-12">
      <TopCollections />
      <Explore />
    </div>
  );
}

export default Home;
