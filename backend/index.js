const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const connectToDatabase = require('./lib/db');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
    ],
    // credentials: true,
    // optionsSuccessStatus: 200,
}));

app.use(express.json());
app.use(cookieParser());

require('dotenv').config()

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
};

// user MiddleWare
const verifyToken = async (req, res, next) => {

    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).send({ message: 'No Token Provided' })
    }

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'unauthorized access' })
            }
            req.user = decoded;
            next();
        })
}



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

        app.get('/login', verifyToken, (req, res) => {
            try {
                const user = req.user;
                res.status(200).json({ message: 'User authenticated', user });
            } catch (err) {
                res.status(500).json({ message: 'Internal server error', error: err.message });
            }
        });



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

                const token = jwt.sign(
                    user,
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '3h' })


                // res.status(201).json({ message: 'Login successful' });
                res
                    .cookie('token', token, cookieOption)
                    .status(201)
                    .json({
                        message: 'Login successful',
                        token: token
                    });
            }
            catch (err) {
                res.status(500).json({ message: 'Server error' });
            }
        });

        app.get('/users/:eID', async (req, res) => {
            try {
                const { eID } = req.params;
                console.log(eID);

                const [rows] = await db.query('SELECT * FROM users WHERE eID = ?', [eID]);

                if (rows.length === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const user = rows[0];
                res.status(200).json(user);
            } catch (err) {
                res.status(500).json({ message: 'Server error', error: err.message });
            }
        });

        app.get('/categories', async (req, res) => {
            const { name } = req.body;
            try {
                const [rows] = await db.query('SELECT * FROM categories ORDER BY id ASC');

                res.json(rows);
            }
            catch (err) {
                res.status(500).json({ message: 'Failed to fetch categories', error: err.message });
            }
        });

        app.post('/categories', async (req, res) => {
            const { name } = req.body;
            console.log(name);
            if (!name) {
                return res.status(400).json({ message: 'Name is required.' });
            }

            try {
                const [result] = await db.query('INSERT INTO categories (name) VALUES (?)',
                    [name]);

                return res.status(201).json({ message: "Added successfully" });
            } catch (err) {
                res.status(500).json({ message: 'Failed to add category', error: err.message });
            }
        });

        app.post('/add-accounting', async (req, res) => {
            const { dob, account, head, amount, eID } = req.body;

            if (!dob || !account || !head || !amount || !eID) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const [userCheck] = await db.query('SELECT eID FROM users WHERE eID = ?', [eID]);

            if (userCheck.length === 0) {
                return res.status(400).json({ message: 'Invalid eID. User not found.' });
            }


            try {

                const [result] = await db.query(`INSERT INTO records
                     (dob, account, category_name, amount, eID) VALUES (?, ?, ?, ?, ?)`,
                    [dob, account, head, amount, eID]);

                return res.status(201).json({ message: "Entry added successfully" });
            } catch (err) {
                console.error('Failed to add entry:', err.message);
                return res.status(500).json({ message: 'Failed to add entry', error: err.message });
            }
        });

        app.get('/report-data', async (req, res) => {
            const { eID } = req.query;

            if (!eID) {
                return res.status(400).json({ message: 'eID is required.' });
            }

            try {
                const [rows] = await db.query(`SELECT * FROM records
                    WHERE eID = ?`, [eID]);

                if (rows.length === 0) {
                    return res.status(404).json({ message: 'No data found for the given eID.' });
                }

                return res.status(200).json(rows);
            } catch (err) {
                console.error('Error fetching report data:', err);
                return res.status(500).json({ message: 'Failed to fetch report data', error: err.message });
            }
        });




        app.get('/logout', async (req, res) => {
            const user = req.body;
            console.log('logging out', user);
            res
                .clearCookie('token', {
                    ...cookieOption,
                    maxAge: 0
                })
                .send({ success: true })
        })

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