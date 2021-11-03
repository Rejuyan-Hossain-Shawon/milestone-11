const express = require("express");
const { MongoClient } = require('mongodb');
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;

const app = express();
const port = 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://mydbuser1:YlCWdJEvgMkQuyPr@cluster0.7niub.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


// user:mydbuser1
// pass: YlCWdJEvgMkQuyPr




const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("FoodMaster");
        const usersCollection = database.collection("users");

        // get api 
        app.get("/users", async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray()
            console.log(users);
            res.send(users);

        })

        app.get("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await usersCollection.findOne(query);

            console.log(id);
            res.json(user);
            console.log(user);
        })


        // Post Api
        app.post("/users", async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);

            console.log("got new user", req.body);
            console.log("added user ", result)

            res.json(result);
        })
        // put or update api 
        app.put("/users/:id", async (req, res) => {
            const id = req.params.id;
            const user = req.body
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: user.name,
                    email: user.email
                },
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.json(result);




        })

        // delete api 
        app.delete("/users/:id", async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(query);
            console.log(result);
            res.json(result);
        })



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get("/", (req, res) => {
    res.send("running on my crud server");
})
app.listen(port, () => {
    console.log("running on local port ", port);
})