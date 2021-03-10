const express = require('express');
const { route } = require('.');
const chirpStore = require('./utils/chirpstore.js')
let router = express.Router();


//GET http://localhost:3000/api/chirps/id/
router.get('/:id', (req, res) => {
    const chirpId = req.params.id;
    const chirp = chirpStore.GetChirp(chirpId);
    res.json(chirp)
})

//GET http://localhost:3000/api/chirps/
router.get('/', (req, res) => {
    const chirps = chirpStore.GetChirps()
    res.json(chirps);
});

//POST http://localhost:3000/api/chirps/
router.post('/', (req, res) => {
     const newChirp = req.body;
     chirpStore.CreateChirp(newChirp)
     res.json({ msg: `chirp added`})
})

//PUT http://localhost:3000/api/chirps/id
router.put('/:id', (req, res) =>{
    const chirpId = req.params.id;
    const editedChirp = req.body;
    chirpStore.UpdateChirp(chirpId, editedChirp)
    res.json({ msg: `chirp id ${chirpId} edited`})
})

//DELETE http://localhost:3000/api/chirps/id
router.delete('/:id', (req, res) => {
    const chirpId = req.params.id;
    chirpStore.DeleteChirp(chirpId);
    res.json({ msg: `chirp id: ${chirpId} deleted`})
})



module.exports = router;

