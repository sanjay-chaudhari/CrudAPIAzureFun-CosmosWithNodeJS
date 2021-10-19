const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

/* use the Cosmos DB connection string you copied ealier and replace in the `url` variable */
const url = "";
const client = new MongoClient(url);

module.exports = async function (context, req) {
  await client.connect();
  const database = client.db("crud");
  const collection = database.collection("wishlist");
  let obj = await collection.findOne({ _id: req.params.id });
  if (!obj) {
  return  context.res = {
      status: 400,
      body: "not found"
    };
  }
 return context.res = {
    status: 200,
    body: obj,
  };
};