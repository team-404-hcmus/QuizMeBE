import { Collection, Db, MongoClient } from 'mongodb';
import {dbConfig} from './config';
import fs from 'fs';
import path from 'path'
const credentials = path.resolve('./',dbConfig.cert);
const client = new MongoClient('mongodb+srv://cluster0.gbld1.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials
});
let database:Db;
let collection:Collection;
let Question:Collection;
async function ConnectDB() {
  try {
    await client.connect();
    database = client.db("404TEAM");
    collection = database.collection("Quizme");
    Question = database.collection('Question');
  }
  finally{

  }
}
function getUserCollection()
{
	return collection;
}

function getQuestionCollection()
{
  return Question;
}
export default {
	ConnectDB,
  getUserCollection,
  getQuestionCollection
}