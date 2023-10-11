import { ICompanyDTO } from '../interface/ICompanyDTO';

export class CompanyDataMapper {
  /**
   * Converts the given document object to a company DTO object.
   *
   * @param {any} doc - The document object to convert.
   * @return {ICompanyDTO} The company DTO object.
   */
  public toCompanyDTO(doc: any): ICompanyDTO {
    if (!doc) return doc;

    const docObject = doc.toObject ? doc.toObject() : doc;

    return {
      _id: docObject._id,
      name: docObject.name,
      address: docObject.address,
      userId: docObject.userId,
      users: docObject.users,
    };
  }
}
