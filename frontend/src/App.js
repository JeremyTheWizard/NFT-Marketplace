import Navbar from "./components/navbar/Navbar.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DAppProvider, Rinkeby, Kovan } from "@usedapp/core";
import Home from "./pages/Home.js";
import ErrorPage from "./pages/ErrorPage.js";
import Collection from "./pages/Collection.js";
import Asset from "./pages/Asset";
import Profile from "./pages/Profile";
import { MoralisProvider } from "react-moralis";
import { web3InfuraProjectId, appId, serverURL } from "./config";

function App() {
  const config = {
    networks: [Rinkeby, Kovan],
    readOnlyChainId: Rinkeby.chainId,
    readOnlyUrls: {
      [Rinkeby.chainId]: `{https://mainnet.infura.io/v3/${web3InfuraProjectId}}`,
    },
  };

  return (
    <MoralisProvider appId={appId} serverUrl={serverURL}>
      <DAppProvider config={config}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/marketplace" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/collections/:collectionname"
              element={<Collection />}
            />
            <Route
              path="/collections/:collectionname/:asset"
              element={<Asset />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Router>
      </DAppProvider>
    </MoralisProvider>
  );
}

export default App;
