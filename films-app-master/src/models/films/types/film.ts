import { AccessType } from '../../accessType';

export interface Film {
    title: string;
    genre: string;
    leadStudio: string;
    audienceScore: number;
    profitability: number;
    rottenTomatoes: number;
    worldwideGross: string;
    year: number;
    id: number;
    accessType: AccessType
}
