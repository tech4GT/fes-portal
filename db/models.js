const Sequelize = require('sequelize');
const config = require('../config')

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    dialect: 'postgres',
    port: 5432,

    pool: {
        min: 0,
        max: 5,
        idle: 1000
    }
});


//Table to store the Events
//todo add picture field
const Events = sequelize.define('events', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name : {type : Sequelize.STRING, allowNull: false},
    desc: Sequelize.STRING,
    date: {type: Sequelize.DATE, allowNull: false},
    venue: {type: Sequelize.STRING, allowNull: false},
    archived: Sequelize.BOOLEAN
});

//table to store Users
//todo add picture field
const Users = sequelize.define('users', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
    email: {type: Sequelize.STRING, isEmail: true, allowNull: false},
    college : {type : Sequelize.STRING, allowNull: false},
    bio: Sequelize.STRING
});


//table to store societies
//todo add picture field
const Societies = sequelize.define('societies', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING, allowNull: false},
    college: {type: Sequelize.STRING, allowNull: false},
    description: Sequelize.STRING
});


//table to store the deatils of a local User
const Userlocal = sequelize.define('userlocal', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false}
});


//table to store the details of a local society
const Societylocal = sequelize.define('societylocals', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false}
});

//table to store admins(who can create delete and patch requests)
const Admins = sequelize.define('admins', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    grant: {type: Sequelize.BOOLEAN, default: false}
});

//table to store user society mapping
const Societyusers = sequelize.define('societyusers',{});

//table to store user event mapping
const Usersgoingtoevents = sequelize.define('usersgoingtoevents',{});


//one to one mapping for userlocal and user
Userlocal.belongsTo(Users);
Users.hasOne(Userlocal);


//one to one mapping for societylocal and society
Societylocal.belongsTo(Societies);
Societies.hasOne(Societylocal);


//one to one mapping for events and societies
Events.belongsTo(Societies);
Societies.hasOne(Events);

//many to many mapping for societies and users through table societyuser
Societies.belongsToMany(Users, {through: Societyusers});
Users.belongsToMany(Societies, {through: Societyusers});

//many to many mapping for users and events through usersgoingtoevent
Users.belongsToMany(Events, {through: Usersgoingtoevents});
Events.belongsToMany(Users, {through: Usersgoingtoevents});

sequelize.sync();

module.exports = {
    Users,
    Events,
    Societies,
    Userlocal,
    Societylocal,
    Societyusers,
    Usersgoingtoevents,
    Admins
}