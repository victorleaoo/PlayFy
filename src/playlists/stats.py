import pandas as pd
from collections import Counter # see library to install
from itertools import chain # see library to install
import numpy as np

from .getPlaylistInfo import createPlaylistDataFrame

def get_top_artists(playlist_df):
    """Gets top 5 artists with most tracks apperances on a playlist

    Parameters
    ----------
    playlist_df : DataFrame
        Playlist DataFrame with tracks infos

    Returns
    -------
    JSON
        JSON with top 5 artists (appearances and their % in the whole playlist)
    """

    artists = playlist_df['Track Artists']

    series_top_artists = pd.DataFrame.from_dict(Counter(map(str.strip, chain.from_iterable(artists.str.split(',')))),
                             orient='index').squeeze()
    
    # Get top 5
    series_top_artists = series_top_artists.sort_values(ascending=False)[0:5]
    
    percentage = np.around(100*series_top_artists.values/len(playlist_df), decimals=2)

    percentage_string = []
    for i in percentage:
        percentage_string.append(str(i) + '%')
    
    df_top_artists = pd.DataFrame({'Artist': series_top_artists.keys(), 'Appearances': series_top_artists.values, '%': percentage_string})

    json_top_artists = df_top_artists.to_dict()

    return json_top_artists

def get_top_albums(playlist_df):
    """Gets top 5 albums with most tracks apperances on a playlist

    Parameters
    ----------
    playlist_df : DataFrame
        Playlist DataFrame with tracks infos

    Returns
    -------
    JSON
        JSON with top 5 albums (appearances and their % in the whole playlist)
    """

    df_top_albums = playlist_df.groupby(['Album Name'])['Album Name'].count().sort_values(ascending=False)[0:5]
    
    percentage = np.around(100*df_top_albums.values/len(playlist_df), decimals=2)
    
    percentage_string = []
    for i in percentage:
        percentage_string.append(str(i) + '%')
    
    df_top_albums = pd.DataFrame({'Album':df_top_albums.keys(), 'appearances': df_top_albums.values, '%': percentage_string})

    json_top_albums = df_top_albums.to_dict()
    
    return json_top_albums

def get_most_popular_track(playlist_df):
    """Gets the most popular track in a playlist

    Parameters
    ----------
    playlist_df : DataFrame
        Playlist DataFrame with tracks infos

    Returns
    -------
    JSON
        Infos for the most popular track in the playlist
    """

    json_most_popular_track = playlist_df.iloc[playlist_df["Track Popularity"].idxmax()].to_dict()

    return json_most_popular_track

def get_longest_and_shortest_track(playlist_df):
    """Gets the longest and shortest tracks in a playlist

    Parameters
    ----------
    playlist_df : DataFrame
        Playlist DataFrame with tracks infos

    Returns
    -------
    JSON
        Infos for the longest and shortest tracks in the playlist
    """

    return playlist_df.iloc[playlist_df["Track Duration (in MS)"].idxmax()].to_dict(), playlist_df.iloc[playlist_df["Track Duration (in MS)"].idxmin()].to_dict()

def get_all_stats_together(share_link, access_token):
    """Get together all the stats extracted from the playlist and put it on a json return

    Parameters
    ----------
    share_link : str
        playlist share link
    access_token : str
        spotify api access token

    Returns
    -------
    JSON
        All the playlist info together
    """

    playlist_df = createPlaylistDataFrame(share_link, access_token)

    top_artists = get_top_artists(playlist_df)

    top_albums = get_top_albums(playlist_df)

    most_popular_track = get_most_popular_track(playlist_df)

    longest_track, shortest_track = get_longest_and_shortest_track(playlist_df)

    playlist_stats = {
        'top artists': top_artists,
        'top_albums': top_albums,
        'most_popular_track': most_popular_track,
        'longest_track': longest_track,
        'shortest_track': shortest_track
    }

    return playlist_stats