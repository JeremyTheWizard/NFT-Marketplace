import TopCollections from "../components/TopCollections";
import Explore from "../components/Explore";

function Home() {
  return (
    <div className="w-[90vw] max-w-[1200px] mx-auto">
      <TopCollections />
      <Explore />
    </div>
  );
}

export default Home;
