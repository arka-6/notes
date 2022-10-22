const { ObjectId, MongoClient } = require('mongodb');

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

class AppDbUtil {

    static connectionString = 'mongodb+srv://lumenobit:4VCEPWAsd5Wmg63j@cluster0.aczbpwr.mongodb.net/test';

    static async getMongoDbClient() {
        return await MongoClient.connect(
            this.connectionString,
            { useNewUrlParser: true, useUnifiedTopology: true });
    }

    static async getAllNotes(filter = {}, limit = 10, skip = 0) {
        const client = await AppDbUtil.getMongoDbClient();
        const collection = client.db('notesapp').collection('notes');
        return await collection.find(filter, { skip: skip, limit: limit }).toArray();
    }

    static async saveNote(document) {
        const client = await AppDbUtil.getMongoDbClient();
        const collection = client.db('notesapp').collection('notes');
        return await collection.insertOne(document);
    }

    static async updateNote(noteId, documentPartial) {
        const client = await AppDbUtil.getMongoDbClient();
        const collection = client.db('notesapp').collection('notes');
        return await collection.updateOne({ _id: ObjectId(noteId) }, { $set: documentPartial });
    }

    static async deleteNote(noteId) {
        const client = await AppDbUtil.getMongoDbClient();
        const collection = client.db('notesapp').collection('notes');
        return await collection.deleteOne({ _id: ObjectId(noteId) });
    }

}

module.exports = AppDbUtil;
