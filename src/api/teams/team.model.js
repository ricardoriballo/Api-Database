const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        year: { type: Number, required: false, trim: true },
        img: { type: String, required: true, trim: true },
        stadium: { type: String, required:true, trim: true},
        player: [{ type: mongoose.Schema.Types.ObjectId, ref: "players", required: true }]
    },
    {
        timestamps: true
    }
);


const Team = mongoose.model('teams', teamSchema);

module.exports = Team;