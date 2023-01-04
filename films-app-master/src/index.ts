import app from './app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('Film-app is listening on port', port)
})

//add logger - winston - in utils on upperlevel
//error-handler
// nconf - in index.ts create an object with all configs (instead of accesing via process.env), configs have to be in json file ? (check in walgreens)
