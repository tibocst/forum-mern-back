require('dotenv').config();
const { MongoClient } = require('mongodb');
const client = new MongoClient(process.env.MONGO_URL)

async function main() {
    await client.connect();
    console.log('connexion OK!');
    return 'done';
};

main()
    .then(console.log)
    .then(console.error)
    .finally(() => client.close())


// const express = require("express");
// const app = express();
// const port = 3000; 

// app.get("/", (req,res) => {
//     res.send("Racine ddd");
// });

// app.get("/About", (req,res) => {
//     res.send("About");
// });

// app.listen(port, () => {
//     console.log(`App listening on port ${port}!`);
// });