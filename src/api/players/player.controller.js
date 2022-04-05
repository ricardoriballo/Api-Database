const Player = require('./player.model');
const { deleteImgCloudinary } = require("../middlewares/deleteFile.middleware")

const getAll = async (req, res, next) => {
    try {
        const players = await Player.find();
        res.status(200).json(players);
    }   catch (error) {
        return next(error)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const player = await Player.findById(id);
        res.status(200).json(player);
    } catch (error) {
        return next(error)
    }
}

const postOne = async (req, res, next) => {
    try {
        const player = new Player();
        player.name = req.body.name;
        player.age = req.body.age;
        player.country = req.body.country;
        player.position = req.body.position;
        if (req.file) player.img = req.file.path
        const playerDB = await player.save();
        return res.status(201).json(playerDB)
    } catch (error) {
        return next(error)
    }
}

const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const player = new Player(req.body);
        player._id = id;
        if (req.file) player.img = req.file.path
        const updatePlayer = await Player.findByIdAndUpdate(id, player);
        return res.status(200).json(updatePlayer);
    } catch (error) {
        return next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const player = await Player.findByIdAndDelete(id);
        if (player.img) deleteImgCloudinary(player.img)
        return res.status(200).json(player);
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    getAll,
    getOne,
    postOne,
    patchOne,
    deleteOne
}