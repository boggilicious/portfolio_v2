import express from "express";
import fs from "fs";
import path from 'path';
import https from 'https';
import mustacheExpress from "mustache-express";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(import.meta.dirname, 'views'));

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.use('/jquery', express.static(path.join(import.meta.dirname, 'node_modules/jquery/dist')));

app.use('/scripts/mustache', express.static(path.join(import.meta.dirname, 'node_modules/mustache')))

app.get('/', (req, res) => {
    res.render('index', {});
});


// Endpoint to serve music albums as JSON
app.get('/api/music', (req, res) => {
    res.json(musicAlbums);
});

// Route to render the music template
app.get('/my-cds', (req, res) => {
    res.render('music');
});



const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    const options = {
        cert: fs.readFileSync('/etc/letsencrypt/live/noskov.lol/fullchain.pem'),
        key: fs.readFileSync('/etc/letsencrypt/live/noskov.lol/privkey.pem')
    };
    https.createServer(options, app).listen(443, () => {
        console.log('HTTPS server running on port 443');
    });

    // Endpoint to add a new album to the JSON file
    app.post('/api/add-album', express.json(), (req, res) => {
        const newAlbum = req.body;

        if (!newAlbum.title || !newAlbum.artist || !newAlbum.year || !newAlbum.art) {
            return res.status(400).send('All fields are required.');
        }

        const albumsFilePath = path.join(import.meta.dirname, 'public/albums/albums.json');

        fs.readFile(albumsFilePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading albums file:', err);
                return res.status(500).send('Internal server error.');
            }

            let albums;
            try {
                albums = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing albums JSON:', parseErr);
                return res.status(500).send('Internal server error.');
            }

            albums.push(newAlbum);

            fs.writeFile(albumsFilePath, JSON.stringify(albums, null, 2), 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing to albums file:', writeErr);
                    return res.status(500).send('Internal server error.');
                }

                res.status(200).send('Album added successfully.');
            });
        });
    });

} else {
    app.listen(8080, () => {
        console.log('HTTP server running on port 8080');
    });
}
