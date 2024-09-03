const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: 'trainee_developer'
});



app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})