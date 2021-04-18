import Utils from "../../utils";
import CountriesModel from "../../models/countries";


export default class Manager {
    addCountries = async (req) => {
        const parsedCountries = parseCountriesData(req);
        return await CountriesModel.insertData(parsedCountries);
    }

    getCountries = async (req) => {
        const { query, skip, limit, sorting } = getQueryForCountries(req);
        return {
            countries: await CountriesModel.findData(query, skip, limit, sorting, req.searchKeys),
            count: await CountriesModel.getCounts(query),
        }
    }

    getFilters = async () => {
        return await CountriesModel.getByAggregateQuery([
            {
                $match: {
                    isDeleted: false
                }
            },
            {
                $group: {
                    _id: 0,
                    country: { $addToSet: '$country' },
                    capital: { $addToSet: '$capital' },
                    language: { $addToSet: '$language' },
                    president: { $addToSet: '$president' }
                },
            },
        ])
    }

    removeCountries = async () => {
        return await CountriesModel.updateData({ isDeleted: false }, { isDeleted: true })
    }
}

const parseCountriesData = (countriesData) => {
    if (!countriesData || !countriesData.length)
        return [];

    const parsedData = []
    countriesData.shift(); // Remove header of CSV
    for (const country of countriesData) {
        if (!country.data || !country.data.length)
            continue;
        parsedData.push({
            country: country.data[0] || "",
            capital: country.data[1] || "",
            population: Number(country.data[2]) || 0,
            language: country.data[3] || "",
            president: country.data[4] || "",
            addedOn: Date.now()
        })
    }
    return parsedData;
}

const getQueryForCountries = (req) => {
    if (req.population) {
        const [form, to] = req.population.split("-")
        req.population = { $gte: Number(form) }
        if (!isNaN(to))
            req.population['$lt'] = to;
    }
    let skip = 0, limit = 0, sorting = { addedOn: 1 };
    if (req.skip || req.skip === 0) {
        skip = req.skip;
        delete req.skip;
    }
    if (req.limit) {
        limit = req.limit;
        delete req.limit;
    }
    if (req.sortBy) {
        sorting = { [req.sortBy.key]: req.sortBy.value };
        delete req.sortBy;
    }
    if (req.searchKeys && req.searchKeyword)
        req = Utils.convertSearchQuery(req);
    req.isDeleted = false;

    return { query: req, skip, limit, sorting };
}