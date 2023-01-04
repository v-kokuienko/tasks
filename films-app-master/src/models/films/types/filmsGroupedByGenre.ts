import { Film } from '.';

export interface FilmsGoupedByGenre {
    [ genre: string ] : Film[]
}