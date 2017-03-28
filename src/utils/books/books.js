import { retrieveData, searchData } from '../network'
import Book from './../../books/Book/book'

/**
 * Retrieve Book data for specified AMId and bookId
 * @param {number} AMId - Asset Manager ID of the Asset
 * @param {string} [bookId] - ID of the Book
 * @param {function} callback - Called with two arguments (error, result) on completion
 */
export function retrieve({AMId, resourceId, token}, callback) {
  const params = {
    AMaaSClass: 'books',
    AMId,
    resourceId,
    token
  }
  retrieveData(params, (error, result) => {
    if (error) {
      callback(error)
    } else {
      if (!Array.isArray(result)) {
        callback(null, _parseBook(result))
        return
      }
      const books = result.map(book => {
        return _parseBook(book)
      })
      callback(null, books)
    }
  })
}

export function search({queryKey, queryValue, token}, callback) {
  const params = {
    AMaaSClass: 'books',
    queryKey,
    queryValue,
    token
  }
  searchData(params, (error, result) => {
    if (error) {
      callback(error)
    } else {
      const books = result.map((book) => {
        return _parseBook(book)
      })
      callback(null, books)
    }
  })
}

export function _parseBook(object) {
  return new Book({
    assetManagerId: object.asset_manager_id,
    bookId: object.book_id,
    bookStatus: object.book_status,
    ownerId: object.owner_id,
    closeTime: object.close_time,
    timezone: object.timezone,
    description: object.description,
    positions: object.positions,
    createdBy: object.created_by,
    updatedBy: object.updated_by,
    createdTime: object.created_time,
    updatedTime: object.updated_time,
    version: object.version
  })
}

function _handleCallback(error, result, callback) {
  if (error) {
    callback(error)
  } else {
    callback(null, result)
  }
}
