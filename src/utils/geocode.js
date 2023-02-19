const request = require("request");

/**
 * It basically finds data bassed on location using address through weather api
 * @param {*} address 
 * @param {*} callback funtion
 */
const geocode = (address, callback) => {
    const url =
        "https://api.weatherapi.com/v1/current.json?key=89e0daacde794299abe81935221201&q=" +
        address +
        "&appid=4dd02e51008f958613bfd37e708a81a6";
    request({ url, json: true }, (error, { body }) => {
        if (error)
            callback("Unable to connect. Check Your Internet Connection", undefined);
        else if (body.error) callback(body.error.message, undefined);
        else {
            const data = {
                country: body.location.country,
                city: body.location.name,
                temperature: body.current.temp_c,
                rain: body.current.precip_mm,
                last_updated: body.current.last_updated,
                humidity: body.current.humidity,
                wind_speed: body.current.wind_kph,
                condition: body.current.condition.text,
            };
            callback(undefined, data);
        }
    });
};
module.exports = geocode;