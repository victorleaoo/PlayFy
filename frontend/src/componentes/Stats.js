import React from 'react'

import Table from './statsComponents/Table'
import LoadedFalse from './statsComponents/LoadedFalse'
import SpotifyLogin from './statsComponents/SpotifyLogin'

import { getTopArtists, getTopAlbums } from '../utils/dataManipulation'

import '../styles/Stats.css'

const Stats = (props) => {
    // Page with no playlist loaded yet
    if (props.loaded === false){
        return <LoadedFalse loading={props.loading} />
    } else{
        
        // Error -> Need Authentication
        if (props.error){
            return <SpotifyLogin />
        }

        const topArtists = getTopArtists(props.data)
        const topAlbums = getTopAlbums(props.data)

        return (
            <div className='playlist-stats clearfix'>
                <div className="playlist-container">
                    <div className='playlist-image'>
                        <img src={props.data['playlist']['images'][0]['url']} alt='playlist logo'></img>
                    </div>
                    <div className='playlist-info'>
                        <h1 className="nome-playlist">{props.data['playlist']['name']}</h1>
                        {props.data['playlist']['description'] ? <p className="descricao-playlist">{props.data['playlist']['description']}</p> : <p></p>}
                        <h2 className="dono-playlist">by {props.data['playlist']['owner']['display_name']}</h2>
                    </div>
                </div>

                <hr></hr>

                <h1>Top Artists</h1>
                <Table topTable={topArtists} top='artist'/>

                <h1>Top Albums</h1>
                <Table topTable={topAlbums} top='album'/>

                <h1>Most Popular</h1>
                <ul>
                    <li>
                        Track Name: {props.data['most_popular_track']['Track Name']}
                    </li>
                    <li>
                        Track Artists: {props.data['most_popular_track']['Track Artists']}
                    </li>
                    <li>
                        Album Name: {props.data['most_popular_track']['Album Name']}
                    </li>
                    <li>
                        Track Popularity: {props.data['most_popular_track']['Track Popularity']}
                    </li>
                    <li>
                        Track Duration: {props.data['most_popular_track']['Track Duration']}
                    </li>
                </ul>

                <h1>Longest</h1>
                <ul>
                    <li>
                        Track Name: {props.data['longest_track']['Track Name']}
                    </li>
                    <li>
                        Track Artists: {props.data['longest_track']['Track Artists']}
                    </li>
                    <li>
                        Album Name: {props.data['longest_track']['Album Name']}
                    </li>
                    <li>
                        Track Popularity: {props.data['longest_track']['Track Popularity']}
                    </li>
                    <li>
                        Track Duration: {props.data['longest_track']['Track Duration']}
                    </li>
                </ul>

                <h1>Shortest</h1>
                <ul>
                    <li>
                        Track Name: {props.data['shortest_track']['Track Name']}
                    </li>
                    <li>
                        Track Artists: {props.data['shortest_track']['Track Artists']}
                    </li>
                    <li>
                        Album Name: {props.data['shortest_track']['Album Name']}
                    </li>
                    <li>
                        Track Popularity: {props.data['shortest_track']['Track Popularity']}
                    </li>
                    <li>
                        Track Duration: {props.data['shortest_track']['Track Duration']}
                    </li>
                </ul>

            </div>
        )
    }
}

export default Stats