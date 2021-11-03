const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.json());
const port = 5000;

const users = [
    { name: "shawon", id: 0, email: "shawon@gmail.com" },
    { name: "rahim", id: 1, email: "rahim@gmail.com" },
    { name: "korim", id: 2, email: "korim@gmail.com" },
    { name: "fahim", id: 3, email: "fahim@gmail.com" },
    { name: "uhim", id: 4, email: "uhim@gmail.com" },
    { name: "mohim", id: 5, email: "mohim@gmail.com" },
    { name: "rabbi", id: 6, email: "rabbi@gmail.com" },
]


app.get('/', (req, res) => {
    res.send(users);
})
// queyr search 
app.get("/users", (req, res) => {


    const search = req.query.search;

    if (search) {
        const result = users.filter(user => user.name.toLowerCase().includes(search))
        res.send(result);
    }
    else {
        res.send(users)
    }



})

// dynamic id 
app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    res.send(users[id]);

})
// post method 

app.post("/users", (req, res) => {
    const addedUser = req.body;
    addedUser.id = users.length;
    users.push(addedUser);
    console.log(addedUser);
    res.json(addedUser);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})