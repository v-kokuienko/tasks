import {
    Request,
    Body,
    Controller,
    Get,
    Path,
    Post,
    Query,
    Route,
    SuccessResponse,
    Security
  } from "tsoa";
  import { User, Token } from "../models/users/types";
  import { UserCreateRequest, UserLoginRequest } from "./types";
  import { UserModel } from "../models/users/userModel";
  import { AllUsersInstance } from "../models/users/allUsersModel"
  
  @Route("/user")
  export class AllUsersController extends Controller {
    @Post("/create")
    public async registerUser(
        @Body() requestBody: UserCreateRequest
    ): Promise<User> {
        const user = new UserModel(requestBody);
        await user.register();
        return user;
    }

    @Post("/login")
    public async loginUser(
        @Body() requestBody: UserLoginRequest
    ): Promise<Token> {
        const user = await AllUsersInstance.getMemberByEmail(requestBody);
        return user.login();
    }

    @Post("/logout")
    @Security("jwt")
    public async logoutUser(
        @Request() request
    ) {
        return request.user.logout();
    }
  }

  