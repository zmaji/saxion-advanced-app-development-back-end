import { Document, Types } from 'mongoose';

/**
 * Remove the _id field from a document or an array of mongoDB documents.
 * @param docOrArray A single document or an array of mongoDB documents.
 */
export function removeIdField<T extends Document | Document[]>(docOrArray: T): T {
    const removeId = (doc: Document) => {
        if (doc && doc._id) {
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
