async function fetchAlbums() {
    try {
        const response = await fetch('/albums/albums.json');
        const albums = await response.json();
        const list = document.getElementById('albums-list');

        const albumTemplateResponse = await fetch('/album_small.mustache');
        const albumTemplate = await albumTemplateResponse.text();

        albums.forEach(album => {
            const renderedAlbum = Mustache.render(albumTemplate, album);
            const listItem = document.createElement('li');
            listItem.innerHTML = renderedAlbum;
            list.appendChild(listItem);
        });

        document.getElementById('cd-count').innerText = `Currently I own ${albums.length} CDs (o)`;
    } catch (error) {
        console.error('Error fetching albums or template:', error);
    }
}

fetchAlbums();