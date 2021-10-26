const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const port = 5000;

app.get("/", (req, res) => {
    res.send("now try the another wayhello to my node second with nodemon,wow its working");
})

const users = [
    { name: "shabana", id: 0, address: "dhaka", phone: "0852080" },
    { name: "labana", id: 1, address: "dhaka", phone: "0852080" },
    { name: "rabana", id: 2, address: "dhaka", phone: "0852080" },
    { name: "kubana", id: 3, address: "dhaka", phone: "0852080" },
    { name: "muabana", id: 4, address: "dhaka", phone: "0852080" },
    { name: "irabana", id: 5, address: "dhaka", phone: "0852080" },
    { name: "lana", id: 6, address: "dhaka", phone: "0852080" }

]

app.get("/users", (req, res) => {
    const search = req.query.search;
    if (search) {
        const searchResult = users.filter(user => user.name.toLowerCase().includes(search));
        res.send(searchResult);

    }
    else {
        res.send(users);
    }


})

// post method 
app.post("/users", (req, res) => {
    const addedUser = (req.body);
    addedUser.id = users.length;
    users.push(addedUser);

    console.log("hitting the post method in node");
    res.json(addedUser);
})

app.get("/users/:id", (req, res) => {
    const index = req.params.id;
    const user = users[index];
    res.send(user);


})

app.listen(port, () => {
    console.log("welcome to port ", port);
})
