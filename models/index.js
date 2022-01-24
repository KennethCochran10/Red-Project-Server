const db = require('../db');

const UsersModel = require('./users')
const TrackerModel = require('./tracker')
const NotesModel = require('./notes')

module.exports = {
    dbConnection: db,
    models: {
        UsersModel,
        TrackerModel,
        NotesModel
    }
};

UsersModel.hasMany(TrackerModel);
UsersModel.hasOne(NotesModel);

TrackerModel.belongsTo(UsersModel)
TrackerModel.hasOne(NotesModel)

NotesModel.belongsTo(TrackerModel)