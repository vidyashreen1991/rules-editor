export async function updateRules(rules) {
    try {
        const response = await fetch('http://stubonweb.herokuapp.com/2224005e2c7f', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rules)
        });
        return response.text();
    } catch (err) {
        console.error('Error in updateRules', err);
    }
}