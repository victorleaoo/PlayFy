export function getTopArtists(data) {
    const topArtists = Object.keys(data['top artists']['Artist']).map((key) => ({
        name: data['top artists']['Artist'][key],
        appearances: data['top artists']['Appearances'][key],
        percentage: data['top artists']['%'][key],
        })
    );

    return topArtists
}

export function getTopAlbums(data) {
    const topAlbums = Object.keys(data['top_albums']['Album']).map((key) => ({
        name: data['top_albums']['Album'][key],
        appearances: data['top_albums']['appearances'][key],
        percentage: data['top_albums']['%'][key],
        })
    );

    return topAlbums
}