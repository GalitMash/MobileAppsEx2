fetch = require('node-fetch');


exports.requestTests = async function(){
    let id = "0";
    // Creating a new session
    await fetch('http://127.0.0.1:3000/start')
        .then(res => res.json())
        .then(json => {
            id = json.uniqustring;
            console.log("Starting a new session. The result should be the new session's unique string: " + JSON.stringify(json));
            //operations(id1);
            })
        .catch(error => console.log("An error has occurred: " + error));

    //const operations = async (id) => {
        // Adding to M
        await fetch(`http://127.0.0.1:3000/calc/${id}/add/27`, {
            method: 'post',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => {
                console.log(`Testing addition: 27 + 0. The response should be the M of session ${id} with a new value of 27: ` + JSON.stringify(json))
            })
            .catch(error => console.log("An error has occurred: " + error));

        // Subtracting from M
        await fetch(`http://127.0.0.1:3000/calc/${id}/sub/21`, {
            method: 'post',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => console.log(`Testing subtraction: 27 - 21. The response should be the M of session ${id} with a new value of 6: ` + JSON.stringify(json)))
            .catch(error => console.log("An error has occurred: " + error));

        // Multiplying M
        await fetch(`http://127.0.0.1:3000/calc/${id}/multiply/4`, {
            method: 'put',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => console.log(`Testing multiplication: 6 * 4. The response should be the M of session ${id} with a new value of 24: ` + JSON.stringify(json)))
            .catch(error => console.log("An error has occurred: " + error));

        // Dividing M
        await fetch(`http://127.0.0.1:3000/calc/${id}/divide/3`, {
            method: 'put',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => console.log(`Testing division: 24 / 3. The response should be the M of session ${id} with a new value of 8: ` + JSON.stringify(json)))
            .catch(error => console.log("An error has occurred: " + error));

        // Getting M
        await fetch(`http://127.0.0.1:3000/calc/${id}/M`)
            .then(res => res.json())
            .then(json => console.log(`Testing M: The response should be the M of session ${id}:` + JSON.stringify(json)))
            .catch(error => console.log("An error has occurred: " + error));

        // Resetting
        await fetch(`http://127.0.0.1:3000/calc/${id}/reset`, {
            method: 'post',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => console.log(`Testing reset: The result should be the M of session ${id} with the default value of 0: ` + JSON.stringify(json)))
            .catch(error => console.log("An error has occurred: " + error));

        // Deleting id1's session
        await fetch(`http://127.0.0.1:3000/calc/${id}/del`, {
            method: 'delete',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(console.log(`Deleting session ${id}.`))
            .catch(error => console.log("An error has occurred: " + error));

        // Trying to get id1's M. Since we deleted it, we'll get status 404
        await fetch(`http://127.0.0.1:3000/calc/${id}/M`)
            .then(res => console.log(`Testing request to a deleted session (unknown uniquestring): The response's status should be 404: ` + res.status))
            .catch(error => console.log("An error has occurred: " + error));


        // Dividing M by 0 - I throw an exception for it, so it's an example of status 500
        await fetch(`http://127.0.0.1:3000/calc/${id}/divide/0`, {
            method: 'put',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => console.log(`Testing division by 0: I throw an exception for this, so the response's status should be 500: ` + res.status))
            .catch(error => console.log("An error has occurred: " + error));
    //}

};

