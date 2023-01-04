import { AccessType } from '../../accessType';

export interface FilmsRepository {
    getAllFilms(userAccessType: AccessType);
    findByTitle(userAccessType: AccessType, title: string);
    findByGenre(userAccessType: AccessType, genre: string);
    findByYearGroupByGenre(userAccessType: AccessType, year: number);

}