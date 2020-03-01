import { Router, Request, Response, NextFunction } from 'express';
import userController from './../controllers/userController';
import authController from '../controllers/authController';


export class UserRouter {
  router: Router
  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
    * Take each handler, and attach to one of the Express.Router's
    * endpoints.
    */

  init() {
    this.router.post('/signup', authController.signup);
    this.router.post('/login', authController.login);
    //this.router.post('/forgotPassword', authController.forgotPassword);
    //this.router.patch('/resetPassword/:token', authController.resetPassword);

    /*
        this.router
        .route('/')
        .get(userController.getAllUsers)
        .post(userController.createUser);
    
        this.router
        .route('/:id')
        .get(userController.getUser)
        .patch(userController.updateUser)
        .delete(userController.deleteUser);
        */
  }
}

const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;