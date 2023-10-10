import { Document } from 'mongoose';

/**
 * Remove the _id field from a document or an array of MongoDB documents.
 *
 * @param {Document | Document[]} docOrArray - A single document or an array of MongoDB documents.
 * @return {Document | Document[]} - The input document or array of documents with the _id field removed.
 */
export function removeIdField<T extends Document | Document[]>(docOrArray: T): T {
  const removeId = (doc: Document) => {
    if (doc && doc._id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...rest } = doc.toObject();
      return rest;
    }
    return doc;
  };

  if (Array.isArray(docOrArray)) {
    return docOrArray.map((doc) => removeId(doc)) as T;
  } else {
    return removeId(docOrArray) as T;
  }
}
