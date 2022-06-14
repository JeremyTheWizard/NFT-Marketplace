const fixUrl = (url) => {
  return "https://ipfs.io/ipfs/" + url.split("ipfs://")[1];
};

export default fixUrl;
