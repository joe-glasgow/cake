class CakeService {
    getAllCakes() {
        return fetch(`${process.env.CAKE_ENDPOINT}/cakes`)
            .then(response => {
                return response.json();
            })
            .then(result => result);
    }

    addCake(formData) {
        return fetch(`${process.env.CAKE_ENDPOINT}/cakes`, {
            body: JSON.stringify(formData), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'content-type': 'application/json'
            },
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
            .then(response => response.json()) // parses response to JSON
            .then(result => result);
    }

    getCake(cakeId) {
        return fetch(`${process.env.CAKE_ENDPOINT}/cakes/${cakeId}`)
            .then(response => response.json())
            .then(result => result);
    }
}

export default CakeService;