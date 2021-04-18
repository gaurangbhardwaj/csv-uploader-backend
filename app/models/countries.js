import Mongoose from "mongoose";

let countriesSchema = new Mongoose.Schema({
  country: { type: String, default: "" },
  capital: { type: String, default: "" },
  population: { type: Number, default: 0 },
  language: { type: String, default: "" },
  president: { type: String, default: "" },
  addedOn: { type: Number, default: Date.now() },
  isDeleted: { type: Boolean, default: false }
});
countriesSchema.static({
  insertData: function (query) {
    return this.insertMany(query);
  },

  updateData: function (findQuery, updateQuery) {
    return this.updateMany(findQuery, updateQuery, { multi: true });
  },

  findData: function (findQuery, skip = 0, limit = 0, sorting = { addedOn: -1 }, selectionKeys = '') {
    return this.find(findQuery, selectionKeys).sort(sorting).skip(skip).limit(limit);
  },

  getCounts: function (findQuery) {
    return this.find(findQuery).countDocuments();
  },

  getByAggregateQuery: function (findQuery) {
    return this.aggregate(findQuery)
  },
});
export default Mongoose.model("countries", countriesSchema);
