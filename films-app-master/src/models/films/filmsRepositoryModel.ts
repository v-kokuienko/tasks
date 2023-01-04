import { FilmsRepository, Film, FilmsGoupedByGenre } from './types';
import { AccessType } from '../accessType';
import { prepareJsonFromCsv } from './utils/prepFilmsJSON';
import { userAccessTypeLimits } from './utils/userAccessTypeLimits';

class AllFilmsRepository implements FilmsRepository {
    private static instance: AllFilmsRepository;
    private films: Film[] = [];

    private constructor() {
        prepareJsonFromCsv().then(filmsJson => {
            this.films = filmsJson;
        })
    }

    public static getInstance(): AllFilmsRepository {
        if (AllFilmsRepository.instance == null) {
            AllFilmsRepository.instance = new AllFilmsRepository()
        }
        return AllFilmsRepository.instance
    }

    public getAllFilms(userAccessType: AccessType, sortBy?: string, orderType?: string): Film[] {
        const filmsByAccessType = this.filterFilmsByAccessType(userAccessType, this.films);
        return sortBy ? this.sortFilms(filmsByAccessType, sortBy, orderType): filmsByAccessType;
    }

    public findByTitle(userAccessType: AccessType, title: string): Film[] {
        const matchedFilm = this.films.find(currFilm => {
            const symbolsRegex = new RegExp(/[\.,-_:\!\?'"]/g);
            const formatCurrFilm = currFilm.title.trim().toLowerCase().replace(symbolsRegex, '').replace(/\s+/g, ' ');
            const formatFindTitle = title.trim().toLowerCase().replace(symbolsRegex, '').replace(/\s+/g, ' ');
            return formatCurrFilm === formatFindTitle && this.isFilmAllowedByAccessType(userAccessType, currFilm);
        });
        return matchedFilm ? [matchedFilm] : [];
    }

    public findByGenre(userAccessType: AccessType, genre: string, sortBy?: string, orderType?: string): Film[] {
        const filteredFilms = this.films.filter(currFilm => {
            return currFilm.genre.trim().toLowerCase() === genre.trim().toLowerCase() && 
                this.isFilmAllowedByAccessType(userAccessType, currFilm);
        });
        return sortBy ? this.sortFilms(filteredFilms, sortBy, orderType): filteredFilms;
    }

    public findByYearGroupByGenre(userAccessType: AccessType, year: number, sortBy?: string, orderType?: string): FilmsGoupedByGenre {
        const filteredFilms = this.films.filter(currFilm => {
            return currFilm.year === year && this.isFilmAllowedByAccessType(userAccessType, currFilm);;
        });
        const sortedFilms = (sortBy && sortBy !== 'year') ? 
            this.sortFilms(filteredFilms, sortBy, orderType) :
            filteredFilms;
        return sortedFilms.reduce((groupedFilms, currFilm) => {
            if (!groupedFilms[currFilm.genre]) {
                groupedFilms[currFilm.genre] = []
            };
            groupedFilms[currFilm.genre].push(currFilm);
            return groupedFilms;
        }, {})
    }

    private sortFilms(films: Film[], sortBy: string, orderType?: string): Film[] {
        if (orderType === 'asc') {
            return films.sort((a, b) => parseFloat(a[sortBy]) - parseFloat(b[sortBy]));
        }
        return films.sort((a, b) => parseFloat(b[sortBy]) - parseFloat(a[sortBy])); // by deafult - DESC
    }

    private filterFilmsByAccessType(userAccessType: AccessType, films: Film[]): Film[] {
        return films.filter(currFilm => this.isFilmAllowedByAccessType(userAccessType, currFilm))
    }

    private isFilmAllowedByAccessType(userAccessType: AccessType, film: Film): boolean {
        return userAccessTypeLimits[userAccessType]?.canAccessFilms.includes(film.accessType.toLowerCase());
    }
}

export const AllFilmsInstance = AllFilmsRepository.getInstance()