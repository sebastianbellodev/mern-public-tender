import app from './app.js';
import connectToCluster from './db/db.js';

const PORT = process.env.PORT;
const URL = process.env.URL;

connectToCluster((err) => {
  if (!err) {
    if (process.env.NODE_ENV === 'development') {
      app.listen(PORT);
      console.log(`🌱 Server running on http://localhost:${PORT}/api/v1`);
      console.log(`📗 Docs available on http://localhost:${PORT}/api/v1/docs`);
      return;
    }
    app.listen(PORT);
    console.log(`🌱 Server running on ${URL}/api/v1`);
    console.log(`📗 Docs available on ${URL}/api/v1/docs`);
  } else {
    if (process.env.NODE_ENV === 'development') {
      return console.log(err);
    }
    console.log('😟 Something went wrong...');
  }
});
