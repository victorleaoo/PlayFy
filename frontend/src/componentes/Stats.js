import React from 'react'

import TopTable from './statsComponents/TopTable'
import TrackTable from './statsComponents/TrackTable'
import LoadedFalse from './statsComponents/LoadedFalse'
import SpotifyLogin from './statsComponents/SpotifyLogin'
import PlaylistInfo from './statsComponents/PlaylistInfo'

import { getTopArtists, getTopAlbums } from '../utils/dataManipulation'

import '../styles/Stats.css'

const Stats = (props) => {
    // Page with no playlist loaded yet
    if (props.loaded === false){
        return <LoadedFalse loading={props.loading} />
    } else{

        // Playlist link invalid
        if (props.data === "Error"){
            return <SpotifyLogin data={props.data}/>
        }
        
        // Error -> Need Authentication
        if (props.error){
            return <SpotifyLogin data={props.data}/>
        }

        const topArtists = getTopArtists(props.data)
        const topAlbums = getTopAlbums(props.data)

        return (
            <div className='playlist-stats clearfix'>
                <PlaylistInfo data={props.data}/>

                <div className='top-container'>
                    <div className='top-table-container'>
                        <h1>Top Artists</h1>
                        <TopTable topTable={topArtists} 
                                  top='Artist'
                        />
                    </div>

                    <div className='top-table-container'>
                        <h1>Top Albums</h1>
                        <TopTable topTable={topAlbums} 
                                  top='Album'
                        />
                    </div>
                </div>

                <div className='songs-info-container'>
                    <div className='top-table-container'>
                        <h1>Most Popular Track</h1>
                        <TrackTable data={props.data} 
                                    type='most_popular_track'
                        />
                    </div>

                    <div className='top-table-container'>
                        <h1>Longest Track</h1>
                        <TrackTable data={props.data} 
                                    type='longest_track'
                        />
                    </div>

                    <div className='top-table-container'>
                        <h1>Shortest Track</h1>
                        <TrackTable data={props.data} 
                                    type='shortest_track'
                        />
                    </div>
                </div>

            </div>
        )
    }
}

export default Stats