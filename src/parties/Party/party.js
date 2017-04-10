import { AMaaSModel } from '../../core'
import { Address, Email } from '../Children'

import { retrieveData } from '../../utils/network'

/**
 * Class representing a Party
 * @extends AMaaSModel
 */
class Party extends AMaaSModel {
  /**
   * Construct a new Party object
   * @param {object} params - Party creation options
   * @param {number} params.assetManagerId - Asset Manager ID of the Party
   * @param {string} params.partyId - Party ID of the Party
   * @param {string} params.partyStatus=Active - Status of the Party (e.g. 'Active')
   * @param {string} params.partyClass=Party - Class of the Party
   * @param {string} params.partyType=Party - Type of the Party
   * @param {string} params.description - Description of the Party
   * @param {object} params.addresses - Object of Addresses associated with this Party
   * @param (object) params.emails - Object of Emails associated with this Party
   * @param {object} params.references - Object of References associated with this Party
   * @param {string} params.createdBy - ID of the user that created the Party (required if creating a new Party)
   * @param {string} params.updatedBy - ID of the user that updated the Party (use if amending existing Party)
   * @param {date} params.createdTime - Time that the Party was created (required if creating new Party)
   * @param {date} params.updatedTime - Time that the Party was updated (required if amending existing Party)
   * @param {number} params.version - Version number of the Party
   */
  constructor({ assetManagerId, partyId, partyStatus='Active', partyClass='Party', partyType='Party', description='', addresses={}, emails={}, references={}, createdBy, updatedBy, createdTime, updatedTime, version }) {
    super({
      createdBy,
      updatedBy,
      createdTime,
      updatedTime,
      version
    })
    Object.defineProperties(this, {
      _emails: { writable: true, enumerable: false },
      emails: {
        get: function() { return this._emails },
        set: function(newEmails) {
          if (Object.keys(newEmails).length > 0) {
            let primaryEmail = 0
            for (let type in newEmails) {
              if (newEmails.hasOwnProperty(type)) {
                this._checkTypes('email', newEmails[type], Email)
                this._checkEmail(newEmails[type].email)
                if (newEmails[type].emailPrimary) {
                  primaryEmail++
                }
              }
            }
            if (primaryEmail == 0) {
              throw new Error('At least 1 primary email must be supplied')
            }
            this._emails = newEmails
          } else {
            this._emails = {}
          }
        },
        enumerable: true
      },
      _addresses: { writable: true, enumerable: false },
      addresses: {
        get: function() { return this._addresses },
        set: function(newAddresses) {
          if (Object.keys(newAddresses).length > 0) {
            let primaryAdd = 0
            for (let type in newAddresses) {
              if (newAddresses.hasOwnProperty(type)) {
                this._checkTypes('address', newAddresses[type], Address)
                if (newAddresses[type].addressPrimary) {
                  primaryAdd++
                }
              }
            }
            if (primaryAdd == 0) {
              throw new Error('At least 1 primary address must be supplied')
            }
            this._addresses = newAddresses
          } else {
            this._addresses = {}
          }
        }, enumerable: true
      }
    })
    this.assetManagerId = assetManagerId
    this.partyId = partyId
    this.partyStatus = partyStatus
    this.partyClass = partyClass
    this.partyType = partyType
    this.description = description
    this.addresses = addresses
    this.emails = emails
    this.references = references

  }

  // set addresses(newAddresses) {
  //   if (Object.keys(newAddresses).length > 0) {
  //     let primaryAdd = 0
  //     for (let type in newAddresses) {
  //       if (newAddresses.hasOwnProperty(type)) {
  //         this._checkTypes('address', newAddresses[type], Address)
  //         if (newAddresses[type].addressPrimary) {
  //           primaryAdd++
  //         }
  //       }
  //     }
  //     if (primaryAdd == 0) {
  //       throw new Error('At least 1 primary address must be supplied')
  //     }
  //     this._addresses = newAddresses
  //   } else {
  //     this._addresses = {}
  //   }
  // }
  //
  // get addresses() {
  //   return this._addresses
  // }

  /**
   * Upsert an Address
   * @param {string} type - Type of Address (e.g. 'Registered', 'Legal')
   * @param {Address} address - new Address. Note that the new Address cannot be primary if a primary Address already exists. Use this.addresses setter to replace primary Addresses (??)
   */
  upsertAddress(type, address) {
    const addresses = Object.assign({}, this.addresses)
    if (address.addressPrimary) {
      for (let ref in addresses) {
        if (addresses.hasOwnProperty(ref)) {
          addresses[ref].addressPrimary = false
        }
      }
    }
    addresses[type] = address
    this.addresses = addresses
  }

  // set emails(newEmails) {
  //   if (Object.keys(newEmails).length > 0) {
  //     let primaryEmail = 0
  //     for (let type in newEmails) {
  //       if (newEmails.hasOwnProperty(type)) {
  //         this._checkTypes('email', newEmails[type], Email)
  //         this._checkEmail(newEmails[type].email)
  //         if (newEmails[type].emailPrimary) {
  //           primaryEmail++
  //         }
  //       }
  //     }
  //     if (primaryEmail == 0) {
  //       throw new Error('At least 1 primary email must be supplied')
  //     }
  //     this._emails = newEmails
  //   } else {
  //     this._emails = {}
  //   }
  // }
  //
  // get emails() {
  //   return this._emails
  // }

  /**
   * Upsert an Email
   * @param {string} type - Type of Email (e.g. 'Work', 'Support')
   * @param {Emails} email - new Email. Note that the new Email cannot be primary if a primary Email already exists. Use this.emails setter to replace primary Emails (??)
   */
  upsertEmail(type, email) {
    const emails = Object.assign({}, this.emails)
    if (email.emailPrimary) {
      for (let ref in emails) {
        if (emails.hasOwnProperty(ref)) {
          emails[ref].emailPrimary = false
        }
      }
    }
    emails[type] = email
    this.emails = emails
  }

  // Check that the object has the correct type
  _checkTypes(type, contact, classType) {
    if (!(contact instanceof classType)) {
      throw new Error(`Found ${type} with wrong class`)
    }
  }

  // Check if input is a valid email string
  _checkEmail(email) {
    const regex = new RegExp('^.+@.+\..+$')
    if (!regex.test(email)) {
      throw new Error('Not a valid email')
    }
  }


  // toJSON() {
  //   return Object.assign({}, {
  //     addresses: this.addresses,
  //     emails: this.emails,
  //     references: this.references
  //   }, this)
  // }

}

export default Party
