import app from './app.js';
import db from './models/index.js';

const PORT = 3000; 

(async () => {
  try {
    await db.sequelize.sync();
    console.log('Database synchronized');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
})();
