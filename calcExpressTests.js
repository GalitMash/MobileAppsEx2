fetch = require('node-fetch');


exports.requestTests = function(){
    const tests = async (id, addNum, subNum, multNum, divNum) => {
    // Creating a new session
    await fetch('http://127.0.0.1:3000/start')
        .then(res => res.json())
        .then(json => {
            id = json.uniqustring;
            console.log("Starting a new session. The result should be the new session's unique string: " + JSON.stringify(json));
            })
        .catch(error => console.log("An error has occurred: " + error));
        // Adding to M
        await fetch(`http://127.0.0.1:3000/calc/${id}/add/${addNum}`, {
            method: 'post',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => {
                console.log(`Testing addition: 0 + ${addNum}. The response should be the M of session ${id} with a new value of ${addNum}: ` + JSON.stringify(json))
            })
            .catch(error => console.log("An error has occurred: " + error));

        // Subtracting from M
        await fetch(`http://127.0.0.1:3000/calc/${id}/sub/${subNum}`, {
            method: 'post',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => console.log(`Testing subtraction: ${addNum} - ${subNum}. The response should be the M of session ${id} with a new value of 6: ` + JSON.stringify(json)))
            .catch(error => console.log("An error has occurred: " + error));

        // Multiplying M
        await fetch(`http://127.0.0.1:3000/calc/${id}/multiply/${multNum}`, {
            method: 'put',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => console.log(`Testing multiplication: ${addNum-subNum} * ${multNum}. The response should be the M of session ${id} with a new value of 24: ` + JSON.stringify(json)))
            .catch(error => console.log("An error has occurred: " + error));

        // Dividing M
        await fetch(`http://127.0.0.1:3000/calc/${id}/divide/${divNum}`, {
            method: 'put',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(res => res.json())
            .then(json => console.log(`Testing division: ${(addNum-subNum)*multNum} / ${divNum}. The response should be the M of session ${id} with a new value of 8: ` + JSON.stringify(json)))
            .catch(error => console.log("An error has occurred: " + error));

        // Getting M
        await fetch(`http://127.0.0.1:3000/calc/${id}/M`)
            .then(res => res.json())
            .then(json => console.log(`Testing M: The response should be the latest M of session ${id}:` + JSON.stringify(json)))
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

        // Deleting the session
        await fetch(`http://127.0.0.1:3000/calc/${id}/del`, {
            method: 'delete',
            body: null,
            headers: {'Content-Type': 'application/json'},
        })
            .then(console.log(`Testing deletion of session ${id}.`))
            .catch(error => console.log("An error has occurred: " + error));

        // Trying to get the session's M. Since we deleted it, we'll get status 404
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
    };
    console.log("Performing tests...");
    console.log("Starting 2 sessions in parallel with different numbers for the operations to show different results:");
    // Default id of 0, will be changed once the session is created
    tests(0, 27, 21, 4, 3);
    tests(0, 12, 9, 10, 6);

};

