import  { Sequelize } from 'sequelize'; // Import your sequelize instance
import { initUserModel } from './Models/users'; // Adjust the path to your User model
import { initTodoModel } from './Models/todos'; // Adjust the path to your User model

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite', 
  });
// Initialize models
initTodoModel(sequelize);
initUserModel(sequelize);

sequelize.sync()
  .then(() => {
    console.log('Database tables synced successfully');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });

export default sequelize;