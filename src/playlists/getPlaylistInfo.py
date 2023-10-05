import requests

import pandas as pd

from .utils import getPlaylistId, msToMin

# https://developer.spotify.com/documentation/web-api/reference/get-playlist
def getPlaylist(share_link, access_token):
    """Get playlist macro info

    Parameters
    ----------
    share_link : str
        playlist share link
    access_token : str
        spotify api access token

    Returns
    -------
    JSON
        JSON with the playlist infos: description, images_url, owner and display name
    """

    playlist_id = getPlaylistId(share_link)

    url = "https://api.spotify.com/v1/playlists/" + playlist_id + "?fields=description%2C+name%2C+images%28url%29%2C+owner%28display_name%29"
    
    headers = {
        "Authorization": "Bearer " + access_token
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Request failed with status code: ", response.status_code)
        print("Response content: " + response.text)

def getPlaylistItemPage(share_link, access_token, next=False):
    """Get playlist items page

    Parameters
    ----------
    share_link : str
        playlist share link
    access_token : str
        spotify api access token
    next : bool
        if it is first page or a next one

    Returns
    -------
    JSON
        JSON with the tracks fields: Total, Limit, Next, Offset, Items(Track(name, popularity, artists(genres, name), duration_ms, album(name))
    """

    playlist_id = getPlaylistId(share_link)

    if next == False:
        url = "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks?fields=total%2C+limit%2C+next%2C+offset%2C+items%28track%28name%2C+popularity%2C+artists%28genres%2C+name%29%2C+duration_ms%2C+album%28name%29%29%29&limit=100"
    else:
        url = share_link

    headers = {
        "Authorization": "Bearer " + access_token
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print("Request failed with status code: ", response.status_code)
        print("Response content: " + response.text)
        return
    
# https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
def getPlaylistItems(share_link, access_token):
    """Get playlist items

    Parameters
    ----------
    share_link : str
        playlist share link
    access_token : str
        spotify api access token

    Returns
    -------
    list
        list with all the tracks (items) infos
    """
    
    playlist_items_pages = []

    response_page = getPlaylistItemPage(share_link, access_token)

    playlist_items_pages.append(response_page)

    try:
        while response_page['next'] is not None:
            response_page = getPlaylistItemPage(response_page['next'], access_token, next=True)

            playlist_items_pages.append(response_page)
    except:
        Exception

    return playlist_items_pages
    
# createPlaylistDataFrame("https://open.spotify.com/playlist/6PPayXaPylORShOqea9n9S?si=c3d6734f756a4d7d", "BQA6ynd65qh_V0VIape2XN4MuKGWFmCn90722YGvFU5k9obV_ibDMei_aj5cu3dOjN8CtpoFSAbqP9QLUT3xcVXoWMIUo8Qqn31pQYzkb4j9gPZyDig")
def createPlaylistDataFrame(share_link, access_token):
    """Create a playlist dataframe from the list of one's infos

    Parameters
    ----------
    share_link : str
        playlist share link
    access_token : str
        spotify api access token
    
    Returns
    -------
    DataFrame
        DataFrame with all the infos extract (each line is a track)
    """

    playlist_items_pages = getPlaylistItems(share_link, access_token)

    tracks_names = []
    tracks_pops = []
    tracks_durations = []
    tracks_durations_ms = []
    tracks_artists = []
    albums_names = []

    for page in playlist_items_pages:
        tracks = page['items']
        for track in tracks:
            artists = ''
            for artist in track['track']['artists']:
                artists += str(artist['name']) + ', '

            tracks_names.append(track['track']['name']) # Track Name
            tracks_pops.append(track['track']['popularity']) # Track Popularity
            tracks_durations.append(msToMin(track['track']['duration_ms'])) # Track Duration
            tracks_durations_ms.append(track['track']['duration_ms']) # Track Duration (ms)
            tracks_artists.append(artists[:-2]) # Tracks Artists
            albums_names.append(track['track']['album']['name']) # Album Name
        
    playlist_data = {
        'Track Name': tracks_names,
        'Track Artists': tracks_artists,
        'Album Name': albums_names,
        'Track Popularity': tracks_pops,
        'Track Duration': tracks_durations,
        'Track Duration (in MS)': tracks_durations_ms
    }

    playlist_df = pd.DataFrame(data=playlist_data)

    # print(playlist_df.head())

    return playlist_df