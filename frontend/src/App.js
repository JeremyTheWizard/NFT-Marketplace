import Navbar from "./components/navbar/Navbar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DAppProvider, Rinkeby, Kovan } from "@usedapp/core";
import Home from "./pages/Home.js";
import ErrorPage from "./pages/ErrorPage.js";
import Collection from "./pages/Collection.js";
import Asset from "./pages/Asset";
import Profile from "./pages/Profile";
import WEB3_INFURA_PROJECT_ID from "./.env";

function App() {
  const config = {
    networks: [Rinkeby, Kovan],
    readOnlyChainId: Rinkeby.chainId,
    readOnlyUrls: {
      [Rinkeby.chainId]: `{https://mainnet.infura.io/v3/${WEB3_INFURA_PROJECT_ID}}`,
    },
  };

  return (
    <DAppProvider config={config}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/marketplace" element={<Home />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/collections/:collectionname" element={<Collection />} />
          <Route
            path="/collections/:collectionname/:asset"
            element={<Asset />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </DAppProvider>
  );
}

export default App;
