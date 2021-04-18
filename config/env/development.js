module.exports = {
  DB:
    process.env.DB ||
    "mongodb+srv://gaurang:gaurang{@@}9900@cluster0.ujd0c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  PORT: process.env.PORT || "3001",
};
