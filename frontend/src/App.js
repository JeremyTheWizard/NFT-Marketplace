import { ThemeProvider } from "@mui/material/styles";
import { DAppProvider, Kovan, Rinkeby } from "@usedapp/core";
import { MoralisProvider } from "react-moralis";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.js";
import { alchemyApiKey, appId, serverURL } from "./config";
import { MaterialTheme } from "./MaterialTheme";
import Asset from "./pages/Asset";
import Collection from "./pages/Collection.js";
import Collections from "./pages/Collections.js";
import Create from "./pages/Create.js";
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
    <ThemeProvider theme={MaterialTheme}>
      <MoralisProvider appId={appId} serverUrl={serverURL}>
        <DAppProvider config={config}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/marketplace" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/collections/:collectionslug"
                element={<Collection />}
              />
              <Route path="/collections" element={<Collections />} />
              <Route
                path="/collections/:collectionslug/:asset"
                element={<Asset />}
              />
              <Route path="/create" element={<Create />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </DAppProvider>
      </MoralisProvider>
    </ThemeProvider>
  );
}

export default App;
