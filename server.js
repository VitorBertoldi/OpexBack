import app from './src/app.js';
import db from './src/models/index.js';

const PORT = 8080; 

(async () => {
  try {
    // await db.sequelize.sync();
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();
