import { AMaaSModel } from '../../core'
const Decimal = require('decimal.js')

class Charge extends AMaaSModel {
  /**
   * Constructs new Charge object
   * @param {object} data: creation options
   * @param {decimal} data.chargeValue: Value of the charge
   * @param {string} data.currency: Currency of charge
   * @param {bool} data.active: Whether this charge is active
   * @param {bool} data.netAffecting: Does this charge affect the net settlement (e.g. true broker commission, false for gov tax)
   * @param {number} data.version: Version of the object
   * @param {object} coreData: AMaaSModel creation options
 */
  constructor({ chargeValue, currency, active, netAffecting, createdBy, updatedBy, createdTime, updatedTime, version }) {
    super({
      createdBy,
      updatedBy,
      createdTime,
      updatedTime,
      version
    })
    this.chargeValue = chargeValue
    this.currency = currency
    this.active = active
    this.netAffecting = netAffecting === false ? false : true
  }

  set active(newActive) {
    switch (newActive) {
      case false:
        this._active = false
        break
      case undefined:
        this._active = true
        break
      default:
        this._active = newActive
    }
  }

  get active() {
    return this._active
  }

  set netAffecting(newNetAffecting) {
    switch (newNetAffecting) {
      case false:
        this._netAffecting = false
        break
      case undefined:
        this._netAffecting = true
        break
      default:
        this._netAffecting = newNetAffecting
    }
  }

  get netAffecting() {
    return this._netAffecting
  }

  set chargeValue(newChargeValue=0) {
    this._chargeValue = new Decimal(newChargeValue)
  }

  get chargeValue() {
    return this._chargeValue
  }
}

export default Charge
