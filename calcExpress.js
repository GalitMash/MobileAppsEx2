const express = require('express');
const uuid = require('uuid');
const tests = require('./calcExpressTests');

const app = express();
const port = 3000;
let sessions = [];

/* Routing */


    // GET - Starting a new session and returning the unique string assigned to the session
    app.get('/start', (req, res) => {
        const newSession = {
                uniqustring: uuid.v4(),
                M: 0,
            };
        sessions.push(newSession);
        res.status(200).json({"uniqustring": newSession.uniqustring});
    });

    // POST - Adding :num to M and returning the new M
    app.post('/calc/:uniqustring/add/:num', (req, res) => {
        if (Number.isNaN(parseInt(req.params.num))) {
            // Exception if num is not a number
            throw new Error(`${parseInt(req.params.num)} is not a number`);
        }
        const found = sessions.some(session => session.uniqustring === req.params.uniqustring);
        if (found) {
            sessions.forEach(session => {
                if (session.uniqustring === req.params.uniqustring) {
                    session.M += parseInt(req.params.num);
                    res.status(200).json({"M": session.M})
                }
            });
        } else {
            // There's no session with this unique string
            res.status(404).json({msg: `${req.params.uniqustring} is unknown`});
        }
    });

    // POST - Subtracting :num from M and returning the new M
    app.post('/calc/:uniqustring/sub/:num', (req, res) => {
        if (Number.isNaN(parseInt(req.params.num))) {
            // Exception if num is not a number
            throw new Error(`${req.params.num} is not a number`);
        }
        const found = sessions.some(session => session.uniqustring === req.params.uniqustring);
        if (found) {
            sessions.forEach(session => {
                if (session.uniqustring === req.params.uniqustring) {
                    session.M -= parseInt(req.params.num);
                    res.status(200).json({M: session.M})
                }
            });
        } else {
            // There's no session with this unique string
            res.status(404).json({msg: `${req.params.uniqustring} is unknown`});
        }
    });

    // PUT - Multiplying :num with M and returning the new M
    app.put('/calc/:uniqustring/multiply/:num', (req, res) => {
        if (Number.isNaN(parseInt(req.params.num))) {
            // Exception if num is not a number
            throw new Error(`${req.params.num} is not a number`);
        }
        const found = sessions.some(session => session.uniqustring === req.params.uniqustring);
        if (found) {
            sessions.forEach(session => {
                if (session.uniqustring === req.params.uniqustring) {
                    session.M *= parseInt(req.params.num);
                    res.status(200).json({M: session.M})
                }
            });
        } else {
            // There's no session with this unique string
            res.status(404).json({msg: `${req.params.uniqustring} is unknown`});
        }
    });

    app.put('/calc/:uniqustring/divide/:num', (req, res) => {
        if (Number.isNaN(parseInt(req.params.num))) {
            // Exception if num is not a number
            throw new Error(`${req.params.num} is not a number`);
        }
        if (parseInt(req.params.num) === 0){
            // Exception if num is 0
            throw new Error("Can't divide by zero");
        }
        const found = sessions.some(session => session.uniqustring === req.params.uniqustring);
        if (found) {
            sessions.forEach(session => {
                if (session.uniqustring === req.params.uniqustring) {
                    session.M /= parseInt(req.params.num);
                    res.status(200).json({M: session.M})
                }
            });
        } else {
            // There's no session with this unique string
            res.status(404).json({msg: `${req.params.uniqustring} is unknown`});
        }
    });

    // GET - getting M
    app.get('/calc/:uniqustring/M', (req, res) => {
        const found = sessions.some(session => session.uniqustring === req.params.uniqustring);
        if (found) {
            sessions.forEach(session => {
                if (session.uniqustring === req.params.uniqustring) {
                    res.status(200).json({M: session.M})
                }
            });
        } else {
            // There's no session with this unique string
            res.status(404).json({msg: `${req.params.uniqustring} is unknown`});
        }
    });

    // POST - Resetting M and returning it
    app.post('/calc/:uniqustring/reset', (req, res) => {
        const found = sessions.some(session => session.uniqustring === req.params.uniqustring);
        if (found) {
            sessions.forEach(session => {
                if (session.uniqustring === req.params.uniqustring) {
                    session.M = 0;
                    res.status(200).json({M: 0});
                }
            });
        } else {
            // There's no session with this unique string
            res.status(404).json({msg: `${req.params.uniqustring} is unknown`});
        }
    });

    // DELETE - Deleting session
    app.delete('/calc/:uniqustring/del', (req, res) => {
        let paramUID = req.params.uniqustring;
        const found = sessions.some(session => session.uniqustring === paramUID);
        if (found) {
            sessions.forEach(session => {
                if (session.uniqustring === paramUID) {
                    // Filtering out the session to delete
                    sessions = sessions.filter(session => session.uniqustring !== paramUID);
                    res.status(200).end();
                }
            });
        } else {
            // There's no session with this unique string
            res.status(404).json({msg: `${req.params.uniqustring} is unknown`});
        }
    });

tests.requestTests();

// Handling errors
app.use(function (err, req, res, next) {
    res.status(500).json({msg: `${err.message}`});
});

// Handling 404 responses
app.use(function (req, res, next) {
    res.status(404).send("Sorry, can't find what you requested.")
});

app.listen(port, () => console.log(`Server started on port ${port}`));
