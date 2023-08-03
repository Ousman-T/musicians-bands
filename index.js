const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
// Define associations here

// Band.createBulk({
//     name: 'Nirvana',
//     genre: 'Rock'
// },
// {
//     name: 'Red Hot Chilli Peppers',
//     genre: 'Rock'
// },
// {
//     name: 'The Roots',
//     genre: 'Hip-Hop'
// })

module.exports = {
    Band,
    Musician,
    Song
};
