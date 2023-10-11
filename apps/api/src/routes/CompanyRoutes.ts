import { Router } from 'express';
import { CompanyController } from '../controllers/CompanyController';

export class CompanyRoutes {
  private router: Router;
  private companyController: CompanyController;

  constructor(companyController: CompanyController) {
    this.router = Router();
    this.companyController = companyController;
    this.initializeRoutes();
  }

  public getRoutes(): Router {
    return this.router;
  }

  private initializeRoutes() {
    this.router.get(
      '/',
      this.companyController.getCompanys.bind(this.companyController)
    );
    this.router.post(
      '/',
      this.companyController.postCompany.bind(this.companyController)
    );
    this.router.delete(
      '/:id',
      this.companyController.deleteCompany.bind(this.companyController)
    );
  }
}
