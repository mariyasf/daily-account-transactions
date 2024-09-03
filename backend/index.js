const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const connectToDatabase = require('./lib/db');
const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());



require('dotenv').config()


async function run() {

    try {
        const db = await connectToDatabase();

        // Authentication

        app.get('/users', async (req, res) => {
            const [rows] = await db.query('SELECT * FROM users');
            res.send(rows);

        })

        app.post('/users', async (req, res) => {
            // const db = await connectToDatabase();

            const { fullName,
                gender,
                dob,
                email,
                eID,
                position,
                password } = req.body;


            const [month, day, year] = dob.split('/').map(Number);
            const dobUpdate = new Date(year, month - 1, day);

            console.log(fullName,
                gender,
                dobUpdate,
                email,
                eID,
                position,
                password);

            try {
                const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email])


                if (rows.length > 0) {
                    return res.status(409).json({ message: "user already existed" })
                }

                const hashPassword = await bcrypt.hash(password, 10)

                await db.query(`INSERT INTO users (fullName,
                                gender,
                                dob,
                                email,
                                eID,
                                position,
                                password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [fullName,
                        gender,
                        dobUpdate,
                        email,
                        eID,
                        position,
                        hashPassword])

                return res.status(201).json({ message: "user created successfully" })

            }
            catch (err) {
                return res.status(500).json(err.message)
            }

        })

        app.post('/login', async (req, res) => {
            const { eID, password } = req.body;
            console.log(eID, password);

            try {

                const [rows] = await db.query('SELECT * FROM users WHERE eID = ?', [eID]);
                if (rows.length === 0) {
                    return res.status(401).json({ message: 'Invalid eID' });
                }

                const user = rows[0];
                const match = await bcrypt.compare(password, user.password);
                console.log(password, user.password, match);

                if (!match) {
                    return res.status(401).json({ message: 'Invalid password' });
                }

                res.status(201).json({ message: 'Login successful' });
            } catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
        });


        console.log("Pinged your deployment. You successfully connected to Mysql!");
    } finally {


    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})