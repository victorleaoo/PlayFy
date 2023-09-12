def getPlaylistId(share_link):
    """Extract the playlist id from the pc format

    Parameters
    ----------
    share_link : str
        String containing the playlist share link 

    Returns
    -------
    playlist_id : str
        Playlist id
    """

    # Format from PC: https://open.spotify.com/playlist/playlist_id?si=some_stuff
    playlist_id = share_link.split('/')[4].split('?')[0]

    return playlist_id

def msToMin(ms):
    """Convert ms to minutes

    Parameters
    ----------
    ms : int
        Miliseconds

    Returns
    -------
    tempo_formatado : str
        Time formated min:sec
    """
    minutos = ms // 60000 
    segundos = (ms % 60000) // 1000 
    
    tempo_formatado = f"{minutos}:{segundos:02d}"
    
    return tempo_formatado