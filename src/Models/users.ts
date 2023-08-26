import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../database.db', 
  });
  
class Users extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}

Users.init(
  {
    id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      autoIncrement:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
  },
  {
    sequelize,
    tableName: 'users', 
  }
);

export { Users };
