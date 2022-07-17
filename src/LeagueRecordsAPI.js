async function callAPI(page, stats, kwargs){
    // instantiate a headers object
    var myHeaders = new Headers();
    // add content type header to object
    myHeaders.append("Content-Type", "application/json");
    // using built in JSON utility package turn object to string and store in a variable
    var raw = JSON.stringify({"page":page,"stats":stats,"kwargs":kwargs});
    // create a JSON object with parameters for API call and store in a variable
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // make API call with parameters and use promises to get response
    console.log("API Hit");
    return fetch("https://fasg0l1pe2.execute-api.us-east-2.amazonaws.com/dev", requestOptions)
    .then(response => response.text())
    .then(result => { return JSON.parse(result).body})
    .catch(error => { return error });
}

export default callAPI