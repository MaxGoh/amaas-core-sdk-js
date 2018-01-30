import { retrieveData, insertData, putData } from '../network'

/**
 * @function retrieve
 * @memberof module:api.EOD
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Asset Manager ID
 * @param {object} params.query - Object of query params:<br/>
 * Available keys are:
 * <li>`string` businessDateStart</li>
 * <li>`string` businessDateEnd</li>
 * <li>`string` assetIds</li>
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function retrieve({ AMId, query }, callback) {
  const params = {
    AMaaSClass: 'eod',
    AMId,
    query
  }
  let promise = retrieveData(params).then(result => {
    if (typeof callback === 'function') {
      callback(null, result)
    }
    return result
  })
  if (typeof callback !== 'function') {
    return promise
  }
  promise.catch(error => callback(error))
}

export function insert({ AMId, businessDate, data }, callback) {
  const params = {
    AMaaSClass: 'eod',
    AMId,
    resourceId: `${businessDate}`,
    data: JSON.parse(JSON.stringify(data || {}))
  }
  let promise = insertData(params).then(result => {
    if (typeof callback === 'function') {
      callback(null, result)
    }
    return result
  })
  if (typeof callback !== 'function') {
    return promise
  }
  promise.catch(error => callback(error))
}

export function amend({ AMId, businessDate, assetIds, data }, callback) {
  const params = {
    AMaaSClass: 'eod',
    AMId,
    resourceId: `${businessDate}/${assetIds}`,
    data: JSON.parse(JSON.stringify(data || {}))
  }
  let promise = putData(params).then(result => {
    if (typeof callback === 'function') {
      callback(null, result)
    }
    return result
  })
  if (typeof callback !== 'function') {
    // return promise if callback is not provided
    return promise
  }
  promise.catch(error => callback(error))
}
/**
 * @function triggerEODJob
 * @memberof module:api.EOD
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Asset Manager ID for the Book
 * @param {string} params.bookId - Book ID to run the EOD batch job for
 * @param {string} params.businessDate - Which date to run the batch for (max allowed is T - 1 where T === today)
 * @param {string} [params.closeTime] - Close time at which to run the batch job for (defaults to book close time)
 * @param {string} [params.timezone] - Timezone in which to run the batch job (from which the close time will be calculated). Defaults to book timezone
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promise
 */
export function triggerEODJob(
  { AMId, bookId, businessDate, closeTime, timezone },
  callback
) {
  let queryParams = { businessDate }
  if (closeTime) queryParams = { ...queryParams, closeTime }
  if (timezone) queryParams = { ...queryParams, timezone }
  const params = {
    AMaaSClass: 'eodBatch',
    AMId,
    resourceId: bookId,
    queryParams
  }
  let promise = insertData(params).then(result => {
    if (typeof callback === 'function') {
      callback(null, result)
    }
    return result
  })
  if (typeof callback !== 'function') {
    return promise
  }
  promise.catch(error => calback(error))
}

/**
 * @function listBatchJobs
 * @memberof module:api.EOD
 * @static
 * @param {object} params - object of parameters:
 * @param {number} params.AMId - Asset Manager ID for the Book
 * @param {string} params.businessDate - Which date to retrieve the batch for (max allowed is T - 1 where T === today)
 * @param {string} [params.executionId] - Specific batch execution ID
 * @param {Function} [callback] - Called with two arguments (error, result) on completion
 * @returns {Promise|null} If no callback supplied, returns a Promsie
 */
export function listBatchJobs(
  { AMId, bookId, businessDate, executionId },
  callback
) {
  let query = { businessDate }
  if (executionId) query = { ...query, executionId }
  const params = {
    AMaaSClass: 'eodBatch',
    AMId,
    resourceId: bookId,
    query
  }
  let promise = retrieveData(params).then(result => {
    if (typeof callback === 'function') {
      callback(null, result)
    }
    return result
  })
  if (typeof callback !== 'function') {
    return promise
  }
  promise.catch(error => callback(error))
}
