const timeSinceCalculator = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 2) {
    return Math.floor(interval) + " years ago";
  } else if (interval >= 1) {
    return Math.floor(interval) + " year ago";
  }
  interval = seconds / 2592000;
  if (interval > 2) {
    return Math.floor(interval) + " months ago";
  } else if (interval >= 1) {
    return Math.floor(interval) + " month ago";
  }
  interval = seconds / 86400;
  if (interval > 2) {
    return Math.floor(interval) + " days ago";
  } else if (interval >= 1) {
    return Math.floor(interval) + " day ago";
  }
  interval = seconds / 3600;
  if (interval > 2) {
    return Math.floor(interval) + " hours ago";
  } else if (interval >= 1) {
    return Math.floor(interval) + " hour ago";
  }
  interval = seconds / 60;
  if (interval > 2) {
    return Math.floor(interval) + " minutes ago";
  } else if (interval >= 1) {
    return Math.floor(interval) + " minute ago";
  }
  interval = seconds * 60;
  if (interval > 2) {
    return Math.floor(seconds) + " seconds ago";
  } else if (interval >= 1) {
    return Math.floor(interval) + " second ago";
  }
};

export default timeSinceCalculator;
