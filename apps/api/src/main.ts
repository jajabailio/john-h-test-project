import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import { connectToDatabase } from './infrastructure/config/db';
import { UserController } from './controllers/UserController';
import { UserDataMapper } from './infrastructure/mappers/UserDataMapper';
import { UserRoutes } from './routes/UserRoutes';
import { CompanyController } from './controllers/CompanyController';
import { CompanyDataMapper } from './infrastructure/mappers/CompanyDataMapper';
import { CompanyRoutes } from './routes/CompanyRoutes';
const userMapper = new UserDataMapper();
const userController = new UserController(userMapper);
const userRoutes = new UserRoutes(userController);
const companyMapper = new CompanyDataMapper();
const companyController = new CompanyController(companyMapper);
const companyRoutes = new CompanyRoutes(companyController);
dotenv.config();

export const createApp = (
  userRoutes: UserRoutes,
  companyRoutes: CompanyRoutes
): Application => {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api/users', userRoutes.getRoutes());
  app.use('/api/companies', companyRoutes.getRoutes());

  const connectionString = process.env.MONGODB_CONNECTION_STRING;
  connectToDatabase(connectionString || '');

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  return app;
};

createApp(userRoutes, companyRoutes);
