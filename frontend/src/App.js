import "./App.css";
import Navbar from "./components/Navbar.js";
import TopCollections from "./components/TopCollections";
import NftsCards from "./components/NftsCards";

function App() {
  return (
    <div className="App w-[90vw] max-w-[1200px] mx-auto">
      <Navbar />
      <TopCollections />
      <NftsCards />
    </div>
  );
}

export default App;
