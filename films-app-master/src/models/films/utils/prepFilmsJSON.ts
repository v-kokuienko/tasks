import https from 'https';
import csvtojson from 'csvtojson';
import { Film } from '../types'


// TODO: export URl to configs
const url = "https://gist.githubusercontent.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea/raw/0c794a9717f18b094eabab2cd6a6b9a226903577/movies.csv"
// TODO: move filmCSVHeaders to a different file
const filmCSVHeaders = ['title','genre', 'leadStudio', 'audienceScore', 'profitability', 'rottenTomatoes', 'worldwideGross', 'year'];

export const prepareJsonFromCsv = async (): Promise<Film[]> => {
    const csvStr = await readFileByURl();
    if (!csvStr) {
        throw new Error('Error! No films data downloaded.')
    }
    const filmsJson = await formatCsvStringToJson(csvStr);
    return filmsJson;
}


const readFileByURl = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        https.request(url, (response) => {
            let data = '';
            response.on('data', (chunk) => {
                data += chunk;
            })
        
            response.on('end', () => {
                resolve(data)
            })
        }).on('error', (error) => {
            reject(error)
        }).end()
    })
}

const formatCsvStringToJson = async (csvStr: string): Promise<Film[]> => {
    return csvtojson({
        flatKeys: true,
        noheader: false,
        headers: filmCSVHeaders
    })
    .fromString(csvStr)
    .then(csvToJson => {
        return csvToJson.map(csvFilm => {
            const id = Math.floor(Math.random() * 1000000);
            return {
                ...csvFilm,
                audienceScore: parseFloat(csvFilm.audienceScore),
                profitability: parseFloat(csvFilm.profitability),
                rottenTomatoes: parseFloat(csvFilm.rottenTomatoes),
                year: parseInt(csvFilm.year),
                id,
                accessType: id % 2 ? 'free' : 'premium'
            }
        })
    })
}








