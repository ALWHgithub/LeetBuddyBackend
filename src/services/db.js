const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://LeetBuddyDB:Me2M7h2XIMlDr66P@leetbuddy.vz6ik0a.mongodb.net/LeetBuddy?retryWrites=true&w=majority";

async function connectToMongoDB() {
  try {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

    // Once connected, return the database instance
    return client.db(); // Get the database instance
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

 async function insertSingle(val) {
  const db = await connectToMongoDB();
  const usersCollection = db.collection('solved')
  const insertResult = await usersCollection.insertOne(val);
  console.log('Inserted IDs:', insertResult.insertedIds);
  db.client.close();
}


async function insertMultiple(arr) {
  const db = await connectToMongoDB();
  const usersCollection = db.collection('users')
  const insertManyResult = await usersCollection.insertMany(arr);
  console.log('Inserted IDs:', insertManyResult.insertedIds);
  db.client.close();
}

function create(req, res) {
  insertSingle(req.body)
}

module.exports = {
  create,
};