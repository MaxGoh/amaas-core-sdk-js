import Organisation from '../Organisation/organisation.js'

/**
 * Class representing a Government Agency
 * @memberof module:Parties.Class
 * @extends module:Parties.Class.Organisation
 */
class GovernmentAgency extends Organisation {
  /**
   * Construct a new Government Agency instance
   * @param {object} params - Government Agency creation options
   * @param {number} params.assetManagerId - Asset Manager ID of the Government Agency
   * @param {string} params.partyId - Party ID of the Government Agency
   * @param {string} params.partyStatus=Active - Status of the Government Agency (e.g. 'Active')
   * @param {string} params.partyClass=Organisation - Class of the Government Agency
   * @param {string} params.baseCurrency - Base Currency of the Government Agency (e.g. SGD, USD)
   * @param {string} params.description - Description of the Government Agency
   * @param {object} params.addresses - Object of Addresses associated with this Government Agency
   * @param (object) params.emails - Object of Emails associated with this Government Agency
   * @param {object} params.references - Object of References associated with this Government Agency
   * @param {object} params.comments - Object of Comments associated with the Government Agency
   * @param {object} params.links - Object of Links associated with the Government Agency
   * @param {string} params.createdBy - ID of the user that created the Government Agency
   * @param {string} params.updatedBy - ID of the user that updated the Government Agency
   * @param {date} params.createdTime - Time that the Government Agency was created
   * @param {date} params.updatedTime - Time that the Government Agency was updated
   * @param {number} params.version - Version number of the Government Agency
   */
  constructor({
    assetManagerId,
    partyId,
    partyStatus='Active',
    partyClass='Organisation',
    baseCurrency,
    description='',
    addresses={},
    emails={},
    references={},
    comments={},
    links={},
    createdBy,
    updatedBy,
    createdTime,
    updatedTime,
    version
  }) {
    super({
      assetManagerId,
      partyId,
      partyStatus,
      baseCurrency,
      description,
      addresses,
      emails,
      references,
      comments,
      links,
      createdBy,
      updatedBy,
      createdTime,
      updatedTime,
      version
    })
  }
}

export default GovernmentAgency
