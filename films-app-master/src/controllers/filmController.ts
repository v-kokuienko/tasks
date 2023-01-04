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
  import { AllFilmsInstance } from "../models/films/filmsRepositoryModel";
  import { Film,  FilmsGoupedByGenre} from "../models/films/types";
  import { User } from "../models/users/types";
  import { FindByFilterRequest, SortByValues, OrderType } from "./types";
  
  @Security('auth0')
  @Route("/films")
  export class AllFilmsController extends Controller {
    @Get("/")
    public async getAllFilms(
        @Request() request,
        @Query() sortBy?: SortByValues,
        @Query() orderType?: OrderType
    ): Promise<Film[]> {
        console.log(sortBy)
        console.log('vika', request.user)
        return AllFilmsInstance.getAllFilms(request?.user?.accessType, sortBy, orderType);
    }

    @Post("/find")
    public async getUser(
        @Request() request,
        @Body() requestBody: FindByFilterRequest
    ): Promise<Film[] | FilmsGoupedByGenre> {
        const sortBy = requestBody.sortBy;
        const orderType = requestBody.orderType;
        if (requestBody.filters.title) {
            console.log('title')
            return AllFilmsInstance.findByTitle(
                request.user.accessType,
                requestBody.filters.title
            );
        } else if (requestBody.filters.genre) {
            console.log('genre')
            return AllFilmsInstance.findByGenre(
                request.user.accessType,
                requestBody.filters.genre,
                sortBy,
                orderType
            );
        } else if (requestBody.filters.year) {
            // TODO: enable filtering by genre + year
            console.log('year')
            return AllFilmsInstance.findByYearGroupByGenre(
                request.user.accessType,
                requestBody.filters.year,
                sortBy,
                orderType
            );
        }
      
    }
  }

  