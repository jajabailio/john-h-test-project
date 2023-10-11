import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import { UserController } from './controllers/UserController';
import { UserDataMapper } from './infrastructure/mappers/UserDataMapper';
import { UserRoutes } from './routes/UserRoutes';
import { connectToDatabase } from './infrastructure/config/db';
const userMapper = new UserDataMapper();
const userController = new UserController(userMapper);
const userRoutes = new UserRoutes(userController);
dotenv.config();

export const createApp = (userRoutes: UserRoutes): Application => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api/users', userRoutes.getRoutes());

  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  connectToDatabase(connectionString || '');

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  return app;
};

createApp(userRoutes);
