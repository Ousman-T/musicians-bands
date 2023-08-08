const {  db } = require('./db');
const { Band, Musician, Song } = require('./index.js');

describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        const band1 = new Band({
            name: "The Roots",
            genre: "Hip Hop"
        });
        expect(band1.genre).toBe('Hip Hop');
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        const musician1 = new Musician({
            name: 'Kurt Kobain',
            instrument: 'Guitar'
        })
        expect(musician1.instrument).toBe('Guitar');
    })

    test('can update band', async () => {
            // TODO - test updating a band
            const band2 = new Band({
                name: 'Nirvana',
                genre: "Rock"
            });

        await band2.save();
        const updateBand = await Band.update({
            name: 'Rolling Stones',
        }, 
        {where: {name: 'Nirvana'}});
        const fetchedBand = await Band.findOne({ where: { name: 'Rolling Stones' } });
        expect(fetchedBand.name).toBe('Rolling Stones');
    })

    test('can update a Musician', async () => {
        // TODO - test updating a musician
        const musician3 = new Musician({
            name: "Rhianna",
            instrument: 'Voice'
        });
        await musician3.save();
        const updateMusician = await Musician.update({name: "Beyonce"}, {where: {name: "Rhianna"}});
        const fetchedMusician = await Musician.findOne({where: {name: "Beyonce"}});
        expect(fetchedMusician.name).toBe('Beyonce');
    })

    test('can delete a Band', async () => {
        // TODO - test deleting a band
        const band1 = new Band({
            name: "The Roots",
            genre: "Hip Hop"
        });
        await band1.save();
        const deleteBand = await Band.destroy({where:{genre: 'Hip Hop'}});
        console.log(JSON.stringify(deleteBand, null, 2));
        // await band1.save();
        // await band1.reload();
        const fetchedBand = await Band.findOne({where:{genre: "Hip Hop"}});
        expect(fetchedBand).toBe(null);
    })

    test('can delete a Musician', async () => {
        // TODO - test deleting a musician
        const musician1 = new Musician({
            name: 'Kurt Kobain',
            instrument: 'Guitar'
        });
        await musician1.save();
        const deleteMusician = await Musician.destroy({where:{instrument: 'Guitar'}});
        // console.log(JSON.stringify(deleteMusician, null, 2));
        const fetchedMusician = await Musician.findOne({where:{instrument:'Guitar'}});
        expect(fetchedMusician).toBe(null);
    })
    test('Musician to band one to many test', async () => {
        const band3 = await Band.create({name:'Band of Brothers', genre:'Rap'});
        const manyMusicians = await Musician.bulkCreate([{name: 'Ye', instrument:'Keys'},{name:'Jay-Z', instrument:'Voice'}, {name:'Beanie Siegel', instrument:'Bass'}]);
        // console.log(JSON.stringify(manyMusicians, null, 2));
        await band3.addMusician(manyMusicians);
        const musiciansInBand = await Band.findAll({where:{genre: 'Rap'}, include: Musician});
        console.log('---------------MUSICIANS IN BAND------------');
        console.log(JSON.stringify(musiciansInBand, null, 2));
        // expect(musiciansInBand.getMusician()).toContain(manyMusicians);

    })
    test('Many to many songs vs band', async () => {
        const newBand = await Band.create({name:'The Food Fighters', genre:'Metal'});
        const otherNewBand = await Band.create({name: 'The Fugees', genre:'Soul'});
        const manySongs = Song.bulkCreate([{name:'The Martyrs', year:2014, length:4},{name:'Momentum', year:2021, length: 7},{name:'Ghost', year:2019, length:5}]);
        newBand.addSong(manySongs);
        console.log(JSON.stringify(newBand, null, 2));
        // expect(newBand.Songs).toBe(manySongs);
    })
})