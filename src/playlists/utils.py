def getPlaylistId(share_link):
    # Format from PC: https://open.spotify.com/playlist/playlist_id?si=some_stuff
    playlist_id = share_link.split('/')[4].split('?')[0]

    return playlist_id