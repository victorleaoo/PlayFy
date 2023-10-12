import React from 'react'

const SpotifyLogin = (props) => {
    const CLIENT_ID = "ebe61dc4675e4b0fb672bb7e846536f7"
    const REDIRECT_URI = "http://localhost:3000/"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    if (props.data === "Error"){
        return (
            <div className='enter-playlist'>
                <h1>Playlist Link Invalid!</h1>
            </div>
        )
    }
    return (
        <div className='enter-playlist'>
            <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
                You must Login to Spotify
            </a>
        </div>
    )
}

export default SpotifyLogin