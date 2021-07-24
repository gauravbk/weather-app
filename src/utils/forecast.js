const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fe640834ab2eef941a009d7295f7478a&query=' + latitude +',' +longitude + '&units=m'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, ' It is currently ' + response.body.current.temperature + ' degress out. ')
        }
    })
}

module.exports = forecast