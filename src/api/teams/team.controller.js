const Team = require('./team.model');

const { deleteImgCloudinary } = require("../middlewares/deleteFile.middleware")
const getAll = async (req, res, next) => {
    try {
        const team = await Team.find().populate('player');
        res.status(200).json(team);
    } catch (error) {
        return next(error)
    }
}

const getOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const team = await Team.findById(id).populate('player');
        res.status(200).json(team);
    } catch (error) {
        return next(error)
    }
}

const postOne = async (req, res, next) => {
    try {
        const team = new Team();
        team.name = req.body.name;
        team.year = req.body.year;
        team.player = req.body.player;
        team.stadium = req.body.stadium;
        if (req.file) team.img = req.file.path
        const teamDB = await team.save();
        return res.status(201).json(teamDB)
    } catch (error) {
        return next(error)
    }
}

const patchOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const team = new Team(req.body);
        team.name = req.body.name;
        team.year = req.body.year;
        team.player = req.body.player;
        team.stadium = req.body.stadium;
        if (req.file) team.img = req.file.path
        team._id = id;
        const updateTeam = await Team.findByIdAndUpdate(id, team);
        return res.status(200).json(updateTeam);
    } catch (error) {
        return next(error);
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const team = await Team.findByIdAndDelete(id);
        if (team.img) deleteImgCloudinary(team.img);
        return res.status(200).json(team);
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