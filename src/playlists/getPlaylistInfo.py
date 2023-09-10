import requests
from utils import getPlaylistId

# https://developer.spotify.com/documentation/web-api/reference/get-playlist
# Description, Images, Name, Owner
def getPlaylist(share_link, access_token):
    playlist_id = getPlaylistId(share_link)

    url = "https://api.spotify.com/v1/playlists/" + playlist_id + "?fields=description%2C+name%2C+images%28url%29%2C+owner%28display_name%29"
    
    headers = {
        "Authorization": "Bearer " + access_token
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        print(response.json())
    else:
        print("Request failed with status code: ", response.status_code)
        print("Response content: " + response.text)

# https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks
# Total, Limit, Next, Offset, Items(Track(name, popularity, artists(genres, name), duration_ms, album(name))
def getPlaylistItems(share_link, access_token):
    playlist_id = getPlaylistId(share_link)

    url = "https://api.spotify.com/v1/playlists/" + playlist_id + "/tracks?fields=total%2C+limit%2C+next%2C+offset%2C+items%28track%28name%2C+popularity%2C+artists%28genres%2C+name%29%2C+duration_ms%2C+album%28name%29%29%29&limit=100"

    headers = {
        "Authorization": "Bearer " + access_token
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        # Tratar Next
        print(response.json())
    else:
        print("Request failed with status code: ", response.status_code)
        print("Response content: " + response.text)