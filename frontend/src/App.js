import { DAppProvider, Kovan, Rinkeby } from "@usedapp/core";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.js";
import { alchemyApiKey, appId, serverURL } from "./config";
import Asset from "./pages/Asset";
import Collection from "./pages/Collection.js";
import ErrorPage from "./pages/ErrorPage.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile";

function App() {
  const config = {
    networks: [Rinkeby, Kovan],
    readOnlyChainId: Rinkeby.chainId,
    readOnlyUrls: {
      [Rinkeby.chainId]: `https://eth-rinkeby.alchemyapi.io/v2/${alchemyApiKey}`,
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
