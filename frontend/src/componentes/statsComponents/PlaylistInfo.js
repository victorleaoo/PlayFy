import React from 'react'

const PlaylistInfo = (props) => {
  const playlist_link = props.data['playlist']['external_urls']['spotify']
  const owner_link = props.data['playlist']['owner']['external_urls']['spotify']

  return (
    <div className="playlist-container">
        <div className='playlist-image'>
            <img src={props.data['playlist']['images'][0]['url']} alt='playlist logo'></img>
        </div>
        
        <div className='playlist-info'>
            <a href={playlist_link} target="_blank" rel="noreferrer">
              <h1 className="nome-playlist">{props.data['playlist']['name']}</h1>
            </a>
            {props.data['playlist']['description'] ? <p className="descricao-playlist">{props.data['playlist']['description']}</p> : <p></p>}
            <a href={owner_link} target="_blank" rel="noreferrer">
              <h2 className="dono-playlist">by {props.data['playlist']['owner']['display_name']}</h2>
            </a>
        </div>
    </div>
  )
}

export default PlaylistInfo