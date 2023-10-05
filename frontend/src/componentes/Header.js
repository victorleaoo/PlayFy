import React from 'react'

import '../styles/Header.css'

import github from '../static/github.png'

const Header = (props) => {

  return (
    <div className='nav'>
        <h1 className='nav--h1'>
          Spotipy
        </h1>

        <div className='middle-section'>
          <textarea className='middle-section--textarea' 
                    onChange={(e) => props.changePlaylistLink(e.target.value)} 
                    value = {props.playlistLink} 
                    rows={1}
                    placeholder='https://open.spotify.com/playlist/<playlist_link>?si=<playlist_code>'
                    name='playlist_link'
          >
          </textarea>
          
          <button className={`middle-section--button ${props.buttonCanBeClicked ? 'enabled' : 'disabled'}`}
                  onClick={props.getPlaylistStats}
                  disabled={!props.buttonCanBeClicked}
          >
            Get Stats
          </button>
        </div>

        <a href='https://github.com/victorleaoo/Spotify-Playlists-WebApp' target="_blank" rel="noreferrer">
          <img className='nav--image'
               src={github} 
               alt='Github Logo' 
          >
          </img>
        </a>
    </div>
  )

}

export default Header