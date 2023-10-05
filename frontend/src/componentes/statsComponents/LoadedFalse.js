import React from 'react'

const LoadedFalse = (props) => {
    // If loading
    if (props.loading === true){
        return <div className="loader"></div>
    }

    // If waiting for Playlist Link
    return (
        <div className='enter-playlist'>
            <h1>Enter the Playlist Link</h1>
        </div>
    )
}

export default LoadedFalse