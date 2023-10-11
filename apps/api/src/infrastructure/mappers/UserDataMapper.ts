import { IUserDTO } from '../interface/IUserDTO';

export class UserDataMapper {
  /**
   * Converts the given document object to a user DTO object.
   *
   * @param {any} doc - The document object to convert.
   * @return {IUserDTO} The user DTO object.
   */
  public toUserDTO(doc: any): IUserDTO {
    if (!doc) return doc;

    const docObject = doc.toObject ? doc.toObject() : doc;

    return {
      id: docObject._id,
      firstName: docObject.firstName,
      lastName: docObject.lastName,
      email: docObject.email,
    };
  }
}
