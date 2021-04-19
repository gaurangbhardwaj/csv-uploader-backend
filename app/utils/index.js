"use strict";
import { apiFailureMessage, httpConstants } from "../common/constants";

export default class Utils {
  static response(res, data, message, success, code) {
    const responseObj = {
      responseData: data,
      message: message,
      success: success,
      responseCode: code,
    };
    res.format({
      json: () => {
        res.send(responseObj);
      },
    });
  }

  static responseForValidation(res, errorArray, success, code = 400) {
    const responseObj = {
      message: "Invalid Request",
      errors: errorArray,
      success: success,
      responseCode: code,
    };
    res.format({
      json: () => {
        res.send(responseObj);
      },
    });
  }

  static handleError(err, req, res) {
    if (!res) {
      return false;
    }
    err = err || {};
    const msg = err.message
      ? err.message
      : apiFailureMessage.INTERNAL_SERVER_ERROR;
    const code = err.code
      ? err.code
      : httpConstants.RESPONSE_CODES.SERVER_ERROR;
    this.response(res, {}, msg, httpConstants.RESPONSE_STATUS.FAILURE, code);
  }

  /**
   * This function is made to handle success and error callback!
   * @param promise
   * @returns {Promise<Promise|Bluebird<*[] | R>|Bluebird<any | R>|*|Promise<T | *[]>>}
   */
  static async parseResponse(promise) {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  }

  /**
   * To throw error
   * @param data
   * @param message
   * @param code
   * @returns {{code: number, data: *, message: *}}
   */
  static error(data, message, code = 500) {
    return {
      data: data,
      message: message,
      code: code,
    };
  }

  /**
   * This function while convert requestData object to search query object, having regex and '$or' implementation
   * @param requestData (Query type)
   */
  static convertSearchQuery(requestData) {
    let requestQuery = requestData;
    let searchQuery = [];
    let searchKeys = requestQuery.searchKeys;
    for (let index = 0; index < searchKeys.length; index++) {
      searchQuery.push({ [searchKeys[index]]: { $regex: new RegExp(requestQuery.searchKeyword, "i") } })
    }
    requestQuery['$or'] = searchQuery;
    delete requestQuery.searchKeyword;
    delete requestQuery.searchKeys;
    return requestQuery;
  }

  /**
   * @param functionName
   * @param message
   * @param payload:should be in object form
   * @param developerAlias
   * @param logType ["INFO", "WARNING", "ERROR"]
   * @constructor
   */
  static logger(
    functionName,
    message,
    payload,
    developerAlias,
    logType = "INFO"
  ) {
    let logFontColor;
    switch (logType) {
      case httpConstants.LOG_LEVEL_TYPE.WARN:
        logFontColor = 33;
        break;
      case httpConstants.LOG_LEVEL_TYPE.ERROR:
        logFontColor = 31;
        break;
      default:
        logFontColor = 36;
    }
    console.log(
      `\x1b[${logFontColor}m%s\x1b[0m`,
      `[ ${new Date().toUTCString()} ] ${logType}: ${functionName}: ${message}: ${JSON.stringify(
        payload
      )}: Developer : ${developerAlias}`
    );
  }
}
