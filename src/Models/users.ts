import { Sequelize, DataTypes, Model } from 'sequelize';
  
class Users extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
}
export function initUserModel(sequelize:Sequelize){
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement:true
      },
      name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false,
      }
    },
    {
      sequelize,
      tableName: 'users', 
    }
  );
}

export default Users;
