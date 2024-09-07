async function request(url) {
    const request = await fetch(url)

    if (request.status === 200) {
        const responce = request.json()

        return responce
    } 
    else {
        throw new Error("failed to fetch")
    }
}