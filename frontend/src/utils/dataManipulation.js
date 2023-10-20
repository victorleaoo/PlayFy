export function getTopArtists(data) {
    /*
    Function responsible for gather together all the top artists data in one iterable const
    */
    const topArtists = Object.keys(data['top artists']['Artist']).map((key) => ({
        name: data['top artists']['Artist'][key],
        appearances: data['top artists']['Appearances'][key],
        percentage: data['top artists']['%'][key],
        url: data['top artists']['Artist URL'][key]
        })
    );

    return topArtists
}

export function getTopAlbums(data) {
    /*
    Function responsible for gather together all the top albums data in one iterable const
    */
    const topAlbums = Object.keys(data['top_albums']['Album']).map((key) => ({
        name: data['top_albums']['Album'][key],
        appearances: data['top_albums']['appearances'][key],
        percentage: data['top_albums']['%'][key],
        url: data['top_albums']['Album URL'][key]
        })
    );

    return topAlbums
}