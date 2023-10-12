import React from 'react'

const PlaylistInfo = (props) => {
  return (
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
  )
}

export default PlaylistInfo