const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'secret';

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { email, password } = req.body;

    fs.access(`./server/users/${email}.json`, (error) => {
        if (!error) {
            res.status(400).send({ message: 'User with this email already exists.' });
            return;
        }

        fs.writeFile(
            `./server/users/${email}.json`,
            JSON.stringify({ email, password }),
            (error) => {
                if (error) {
                    res.status(500).send({ message: 'Registration failed, something went wrong... Please try again later.' });
                } else {
                    const token = jwt.sign({ email }, JWT_SECRET);

                    res.send({ token });
                }
            }
        );
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    fs.readFile(`./server/users/${email}.json`, 'utf-8', (error, data) => {
        if (error) {
            res.status(401).send({ type: 'email', message: 'This email is not registered.' });
            return;
        }

        const user = JSON.parse(data);

        if (user.password !== password) {
            res.status(401).send({ type: 'password', message: 'Wrong password.' });
            return;
        }

        const token = jwt.sign({ email: user.email }, JWT_SECRET);
        res.send({ token });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});