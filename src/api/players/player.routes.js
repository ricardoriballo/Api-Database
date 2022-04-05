const PlayerRoutes = require('express').Router();
const { isAuth } = require('../middlewares/auth.middleware');
const upload = require("../middlewares/updateFile. middleware")
const {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
} = require('./player.controller');

PlayerRoutes.get('/', getAll);
PlayerRoutes.get('/:id', getOne);
PlayerRoutes.post('/', [isAuth],upload.single('img'), postOne);
PlayerRoutes.patch('/:id', [isAuth],upload.single('img'), patchOne);
PlayerRoutes.delete('/:id', [isAuth],upload.single('img'), deleteOne);

module.exports = PlayerRoutes;