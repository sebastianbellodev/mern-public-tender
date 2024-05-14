import moongose from 'mongoose';

const USER = process.env.MONGODB_USER;
const PASSWORD = process.env.MONGODB_PASSWORD;
const CLUSTER = process.env.MONGODB_CLUSTER;
const DATABASE = process.env.MONGODB_DATABASE;
const PORT = process.env.MONGODB_PORT;

let CONNECTION_STRING = `mongodb+srv://${USER}:${PASSWORD}@${CLUSTER}.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

// if (process.env.NODE_ENV === 'development') {
//   CONNECTION_STRING = `mongodb://${USER}:${PASSWORD}@localhost:${PORT}/${DATABASE}?authSource=admin`;
// }

const connectToCluster = (callback) => {
  moongose.set('strictQuery', false);
  moongose
    .connect(CONNECTION_STRING)
    .then(() => callback())
    .catch((err) => callback(err));
};

export default connectToCluster;
