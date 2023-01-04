import { Film } from './types'
import { AccessType } from '../accessType';

class FilmModel implements Film {
    title: string;
    genre: string;
    leadStudio: string;
    audienceScore: number;
    profitability: number;
    rottenTomatoes: number;
    worldwideGross: string;
    year: number;
    id: number;
    accessType: AccessType;

    constructor({title, genre, leadStudio = '', audienceScore = 0, profitability = 0,
                rottenTomatoes = 0, worldwideGross = '', year, id, accessType}: Film) {
                this.title = title;
                this.genre = genre;
                this.leadStudio = leadStudio;
                this.audienceScore = audienceScore;
                this.profitability = profitability;
                this.rottenTomatoes = rottenTomatoes;
                this.worldwideGross = worldwideGross;
                this.year = year;
    }
}