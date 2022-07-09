const geocode = require("./utils/geocode.js");
geocode("sinchan", (error, data) => {
  if (error) return console.log(error);
  else return console.log(data);
});
