const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
// Define associations here

// one to many band-musician association
Band.hasMany(Musician);
Musician.belongsTo(Band);

// Many to many associations between song and band
Song.belongsToMany(Band, {through: 'SongBand'});
Band.belongsToMany(Song, {through: 'SongBand'});

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
