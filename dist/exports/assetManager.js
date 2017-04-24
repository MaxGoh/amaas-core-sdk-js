'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.api = exports.Class = undefined;

var _assetManagers = require('../assetManagers');

var Class = _interopRequireWildcard(_assetManagers);

var _assetManagers2 = require('../utils/assetManagers');

var api = _interopRequireWildcard(_assetManagers2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Exports
/**
 * Classes and API methods for the AssetManagers service
 * @module AssetManagers
 */

// Classes
exports.Class = Class;
exports.api = api;

// CRUD methods