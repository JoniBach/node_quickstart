const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://jamesc:6FmhohC59heeG8Yz@cluster0.cpeun7s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err) => {
  const collection = client.db("sample_mflix").collection("movies");
  // const movie =  collection.findOne({ title: 'Back to the Future' });
  client.close();
});
