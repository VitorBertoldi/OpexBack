import { Sequelize, DataTypes } from 'sequelize';
import dbConfig from '../config/db.config.js';
import User from './users.model.js';
import Client from './clients.model.js';
import Building from './buildings.model.js';

const sequelize = new Sequelize({
  host: dbConfig.HOST,
  port: dbConfig.PORT,  
  username: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DATABASE,
  dialect: dbConfig.dialect,
  timezone: 'America/Sao_Paulo'
});

try {
  await sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = usersModel(sequelize, DataTypes);
db.Client = clientsModel(sequelize, DataTypes);
db.Building = buildingsModel(sequelize, DataTypes);

db.Client.belongsTo(db.User, { foreignKey: 'vendedorId', onDelete: 'SET NULL' });
db.User.hasMany(db.Client, { foreignKey: 'vendedorId' });

db.Building.belongsTo(db.Client, { foreignKey: 'clientId', onDelete: 'CASCADE' });
db.Client.hasMany(db.Building, { foreignKey: 'clientId' });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
