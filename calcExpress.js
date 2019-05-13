const express = require('express');
const uuid = require('uuid');

const app = express();
const port = 3000;
const router = express.Router();
let users = [];

// Custom exception constructor that also allows handling with the response it came from
function CustomException(message, res) {
    // TODO: Check if sending the res in the exception works. Probably not. I guess I need to do a try catch in each method.
    const error = new Error(message);
    error.res = res;
    return error;
}
CustomException.prototype = Object.create(Error.prototype, {
    constructor: { value: CustomException }
});

/* Routing */

try {
    // GET - Starting a new session and returning the unique string assigned to the user
    router.get('/start', (req, res) => {
        const newUser = {
            uniquestring: uuid.v4(),
            M: 0,
        };
        users.push(newUser);
        res.status(200).json({"uniquestring": newUser.uniquestring});
    });

    // POST - Adding :num to M and returning the new M
    router.post('/calc/:uniquestring/add/:num', (req, res) => {

        if (Number.isNaN(parseInt(req.params.num))) {
            // Exception if num is not a number
            throw new CustomException(`${req.params.num} is not a number`, res);
        }
        const found = users.some(user => user.uniquestring === parseInt(req.params.uniquestring));
        if (found) {
            users.forEach(user => {
                if (user.uniquestring === parseInt(req.params.uniquestring)) {
                    user.M += num;
                    res.status(200).json({M: user.M})
                }
            });
        } else {
            // There's no user with this unique string
            res.status(404).json({msg: `${req.params.uniquestring} is unknown`});
        }
    });

    // POST - Subtracting :num from M and returning the new M
    router.post('/calc/:uniquestring/sub/:num', (req, res) => {
        if (Number.isNaN(parseInt(req.params.num))) {
            // Exception if num is not a number
            throw new CustomException(`${req.params.num} is not a number`, res);
        }
        const found = users.some(user => user.uniquestring === parseInt(req.params.uniquestring));
        if (found) {
            users.forEach(user => {
                if (user.uniquestring === parseInt(req.params.uniquestring)) {
                    user.M -= num;
                    res.status(200).json({M: user.M})
                }
            });
        } else {
            // There's no user with this unique string
            res.status(404).json({msg: `${req.params.uniquestring} is unknown`});
        }
    });

    // PUT - Multiplying :num with M and returning the new M
    router.put('/calc/:uniquestring/multiply/:num', (req, res) => {
        if (Number.isNaN(parseInt(req.params.num))) {
            // Exception if num is not a number
            throw new CustomException(`${req.params.num} is not a number`, res);
        }
        const found = users.some(user => user.uniquestring === parseInt(req.params.uniquestring));
        if (found) {
            users.forEach(user => {
                if (user.uniquestring === parseInt(req.params.uniquestring)) {
                    user.M += num;
                    res.status(200).json({M: user.M})
                }
            });
        } else {
            // There's no user with this unique string
            res.status(404).json({msg: `${req.params.uniquestring} is unknown`});
        }
    });

    router.put('/calc/:uniquestring/divide/:num', (req, res) => {
        if (Number.isNaN(parseInt(req.params.num))) {
            // Exception if num is not a number
            throw new CustomException(`${req.params.num} is not a number`, res);
        }
        if (num === 0){
            // Exception if num is 0
            throw new CustomException("Can't divide by zero", res);
        }
        const found = users.some(user => user.uniquestring === parseInt(req.params.uniquestring));
        if (found) {
            users.forEach(user => {
                if (user.uniquestring === parseInt(req.params.uniquestring)) {
                    user.M += num;
                    res.status(200).json({M: user.M})
                }
            });
        } else {
            // There's no user with this unique string
            res.status(404).json({msg: `${req.params.uniquestring} is unknown`});
        }
    });

    // GET - getting M
    router.get('/calc/:uniquestring/M', (req, res) => {
        const found = users.some(user => user.uniquestring === parseInt(req.params.uniquestring));
        if (found) {
            users.forEach(user => {
                if (user.uniquestring === parseInt(req.params.uniquestring)) {
                    res.status(200).json({M: user.M})
                }
            });
        } else {
            // There's no user with this unique string
            res.status(404).json({msg: `${req.params.uniquestring} is unknown`});
        }
    });

    // POST - Resetting M and returning it
    router.post('/calc/:uniquestring/reset', (req, res) => {
        const found = users.some(user => user.uniquestring === parseInt(req.params.uniquestring));
        if (found) {
            users.forEach(user => {
                if (user.uniquestring === parseInt(req.params.uniquestring)) {
                    user.M = 0;
                    res.status(200).json({M: 0});
                }
            });
        } else {
            // There's no user with this unique string
            res.status(404).json({msg: `${req.params.uniquestring} is unknown`});
        }
    });

    // DELETE - Deleting session (user)
    router.delete('/calc/:uniquestring/delete', (req, res) => {
        let paramUID = parseInt(req.params.uniquestring);
        const found = users.some(user => user.uniquestring === paramUID);
        if (found) {
            users.forEach(user => {
                if (user.uniquestring === paramUID) {
                    // Filtering out the user to delete
                    users = users.filter(user => user.uniquestring !== paramUID);
                    res.status(200).end();
                }
            });
        } else {
            // There's no user with this unique string
            res.status(404).json({msg: `${req.params.uniquestring} is unknown`});
        }
    });

} catch (error) {
    // Sending HTTP status 500 for exceptions as required in the assignment
    error.res.status(500).json({msg: `${error.message}`});
}

app.use(router);

app.listen(port, () => console.log(`Server started on port ${port}`));

// TODO:
// For tests: require http and create the requests
// Ask if it's ok to return 200 status codes for successful ops, and if it's ok to return jsons