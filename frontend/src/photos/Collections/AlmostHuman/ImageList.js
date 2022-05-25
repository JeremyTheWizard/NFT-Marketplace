function importAllImages(r) {
  return r.keys().map(r);
}
export const allNfts = importAllImages(
  require.context("./", false, /\.(png|jpe?g|svg)$/)
);
