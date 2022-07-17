import { ThemeProvider } from "@mui/material/styles";
import { DAppProvider, Rinkeby } from "@usedapp/core";
import { MoralisProvider } from "react-moralis";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar.js";
import { alchemyApiKey, appId, serverURL } from "./config";
import { MaterialTheme } from "./MaterialTheme";
import NetworkWarningBanner from "./NetworkWarningBanner";
import Asset from "./pages/Asset";
import Collection from "./pages/Collection.js";
import Collections from "./pages/Collections.js";
import Create from "./pages/Create.js";
import CreateCollection from "./pages/CreateCollection.js";
import ErrorPage from "./pages/ErrorPage.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile";

const App = () => {
  const config = {
    networks: [Rinkeby],
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
            <NetworkWarningBanner />
            <Routes>
              <Route path="/" element={<Navigate to="/marketplace" />} />
              <Route path="/marketplace" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/collections/:collectionslug"
                element={<Collection />}
              />
              <Route path="/collections" element={<Collections />} />
              <Route
                path="/assets/:tokenContractAddress/:tokenId"
                element={<Asset />}
              />
              <Route path="/create" element={<Create />} />
              <Route path="/create/collection" element={<CreateCollection />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Router>
        </DAppProvider>
      </MoralisProvider>
    </ThemeProvider>
  );
};

export default App;
