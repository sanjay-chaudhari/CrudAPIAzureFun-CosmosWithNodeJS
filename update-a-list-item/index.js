const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

/* use the Cosmos DB connection string you copied ealier and replace in the `url` variable */
const url = "mongodb://afapi:OEdAEDPEnTf8lITvLJnPHZSIHKp4BWCGQgv9CqjCGpa0N5fjdT3P33pMcJg7xGibamd34bWglyWGsZ4kwiY9LA==@afapi.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@afapi@";const client = new MongoClient(url);

module.exports = async function (context, req) {
  await client.connect();
  const database = client.db("crud");
  const collection = database.collection("wishlist");
  let data = {...req.body };
  let query = {_id:req.params.id}
  let newValues ={$set:data}
 let update = await collection.findOneAndUpdate(query,newValues,{returnOriginal:false})

  if (!update) {
    return (context.res = {
      status: 400,
      body: "found",
    });
  }
context.log(update)
  return (context.res = {
    status: 200,
    body: update.value
  });
};