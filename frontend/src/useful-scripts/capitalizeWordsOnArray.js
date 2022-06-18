const capitalizeWordsOnArray = (arr) => {
  return arr.map((word) => {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  });
};

export default capitalizeWordsOnArray;
