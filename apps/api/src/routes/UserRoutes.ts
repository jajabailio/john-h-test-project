import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export class UserRoutes {
  private router: Router;
  private userController: UserController;

  constructor(userController: UserController) {
    this.router = Router();
    this.userController = userController;
    this.initializeRoutes();
  }

  public getRoutes(): Router {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get(
      '/',
      this.userController.getUsers.bind(this.userController)
    );
    this.router.post(
      '/',
      this.userController.postUser.bind(this.userController)
    );
    this.router.delete(
      '/:id',
      this.userController.deleteUser.bind(this.userController)
    );
  }
}
