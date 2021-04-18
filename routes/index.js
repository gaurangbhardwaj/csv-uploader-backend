import { stringConstants } from "../app/common/constants";
import CountriesController from "../app/modules/countries/controller";

const countriesController = new CountriesController();

module.exports = (app) => {
  app.get("/", (req, res) => res.send(stringConstants.SERVICE_STATUS_HTML));

  app.post("/add-countries", countriesController.addCountries)

  app.post("/get-countries", countriesController.getCountries)

  app.get("/get-filters", countriesController.getFilters)

  app.delete("/remove-countries", countriesController.removeCountries)
};
