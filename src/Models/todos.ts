import { Sequelize, DataTypes, Model } from 'sequelize';
  
class Todo extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public status!: string;
  public userid!:number;
}

export function initTodoModel(sequelize:Sequelize){
  Todo.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      userid:{
        type:DataTypes.NUMBER,
        allowNull:false
      }
    },
    {
      sequelize,
      tableName: 'todos', 
    }
  );
  
}

export default Todo ;
