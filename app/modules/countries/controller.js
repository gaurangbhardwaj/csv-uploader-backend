import Utils from "../../utils";
import {
    httpConstants,
    apiSuccessMessage,
    apiFailureMessage,
} from "../../common/constants";
import CountriesManager from './manager'

export default class Controller {
    /**
     * Add Countries data
     * @param {*} req 
     * @param {*} res 
     * @returns {Promise<void>}
     */
    addCountries = async (req, res) => {
        if (!req.body)
            return Utils.response(
                res,
                {},
                apiFailureMessage.INVALID_REQUEST,
                httpConstants.RESPONSE_STATUS.FAILURE,
                httpConstants.RESPONSE_CODES.BAD_REQUEST
            );
        try {
            const response = await new CountriesManager().addCountries(req.body);
            if (!response)
                return Utils.response(
                    res,
                    {},
                    apiFailureMessage.COUNTRIES_ADDED,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            Utils.response(
                res,
                response,
                apiSuccessMessage.COUNTRIES_ADDED,
                httpConstants.RESPONSE_STATUS.SUCCESS,
                httpConstants.RESPONSE_CODES.OK
            );
        } catch (err) {
            Utils.response(
                res,
                {},
                err.message ? err.message : apiFailureMessage.COUNTRIES_ADDED,
                httpConstants.RESPONSE_STATUS.FAILURE,
                err.code ? err.code : httpConstants.RESPONSE_CODES.SERVER_ERROR
            );
        }
    }

    /**
    * Get Countries data
    * @param {*} req 
    * @param {*} res 
    * @returns {Promise<void>}
    */
    getCountries = async (req, res) => {
        try {
            const response = await new CountriesManager().getCountries(req.body);
            if (!response)
                return Utils.response(
                    res,
                    {},
                    apiFailureMessage.GET_COUNTRIES,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            Utils.response(
                res,
                response,
                apiSuccessMessage.GET_COUNTRIES,
                httpConstants.RESPONSE_STATUS.SUCCESS,
                httpConstants.RESPONSE_CODES.OK
            );
        } catch (err) {
            Utils.response(
                res,
                {},
                err.message ? err.message : apiFailureMessage.GET_COUNTRIES,
                httpConstants.RESPONSE_STATUS.FAILURE,
                err.code ? err.code : httpConstants.RESPONSE_CODES.SERVER_ERROR
            );
        }
    }

    /**
    * Get Filters data
    * @param {*} req 
    * @param {*} res 
    * @returns {Promise<void>}
    */
    getFilters = async (req, res) => {
        try {
            const response = await new CountriesManager().getFilters();
            if (!response)
                return Utils.response(
                    res,
                    {},
                    apiFailureMessage.GET_FILTERS,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            Utils.response(
                res,
                response,
                apiSuccessMessage.GET_FILTERS,
                httpConstants.RESPONSE_STATUS.SUCCESS,
                httpConstants.RESPONSE_CODES.OK
            );
        } catch (err) {
            Utils.response(
                res,
                {},
                err.message ? err.message : apiFailureMessage.GET_FILTERS,
                httpConstants.RESPONSE_STATUS.FAILURE,
                err.code ? err.code : httpConstants.RESPONSE_CODES.SERVER_ERROR
            );
        }
    }

    /**
    * Remove countries
    * @param {*} req 
    * @param {*} res 
    * @returns {Promise<void>}
    */
    removeCountries = async (req, res) => {
        try {
            const response = await new CountriesManager().removeCountries();
            if (!response)
                return Utils.response(
                    res,
                    {},
                    apiFailureMessage.REMOVE_COUNTRIES,
                    httpConstants.RESPONSE_STATUS.FAILURE,
                    httpConstants.RESPONSE_CODES.SERVER_ERROR
                );
            Utils.response(
                res,
                response,
                apiSuccessMessage.REMOVE_COUNTRIES,
                httpConstants.RESPONSE_STATUS.SUCCESS,
                httpConstants.RESPONSE_CODES.OK
            );
        } catch (err) {
            Utils.response(
                res,
                {},
                err.message ? err.message : apiFailureMessage.REMOVE_COUNTRIES,
                httpConstants.RESPONSE_STATUS.FAILURE,
                err.code ? err.code : httpConstants.RESPONSE_CODES.SERVER_ERROR
            );
        }
    }
}