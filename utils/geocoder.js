const axios = require("axios");

async function getCoordinates(address) {

    const url = `https://nominatim.openstreetmap.org/search`;

    const response = await axios.get(url, {
        params: {
            q: address,
            format: "json",
            limit: 1
        },
        headers: {
            "User-Agent": "Wanderlust Project"
        }
    });

    if (response.data.length === 0) {
        throw new Error("Address not found");
    }

    return {
        lat: Number(response.data[0].lat),
        lon: Number(response.data[0].lon)
    };
}

module.exports = getCoordinates;