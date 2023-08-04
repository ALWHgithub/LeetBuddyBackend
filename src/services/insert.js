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


async function insertDataIntoMongoDB() {
  const db = await connectToMongoDB();
  // Now you can perform database operations using the "db" object

  // Insert a single document into the "users" collection
  const usersCollection = db.collection('users');
  const newUser = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
  };
  const insertResult = await usersCollection.insertOne(newUser);
  console.log('Inserted ID:', insertResult.insertedId);

  // Insert multiple documents into the "users" collection
  const newUsers = [
    { name: 'Alice', age: 25, email: 'alice@example.com' },
  ];
  const insertManyResult = await usersCollection.insertMany(newUsers);
  console.log('Inserted IDs:', insertManyResult.insertedIds);
//   const deleteManyResult = await db.collection("users").deleteMany({})
//   console.log('Deleted IDs:', deleteManyResult);
  // Don't forget to close the connection when done
  db.client.close();
}

module.exports = {
    insertDataIntoMongoDB,
};