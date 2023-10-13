import { useState } from 'react';
import axios from 'axios';

import Header from './componentes/Header'
import Stats from './componentes/Stats'

import { getTokenFromURL } from './utils/fetchDataUtils'

import './styles/App.css';


let fetchPlaylistData = 0;

function App() {
  // States
  const [playlistLink, setPlaylistLink] = useState(""); // Playlist Link
  const [buttonCanBeClicked, setButtonCanBeClicked] = useState(false); // Enable/Disable "Get Stats" Button

  const [data, setData] = useState(null); // Spotify Data
  const [error, setError] = useState(""); // Error during Fetching
  const [loaded, setLoaded] = useState(false); // Completed Loading

  const [loading, setLoading] = useState(false); // Loading screen

  // Setting and Checking inserted Playlist Link
  let changePlaylistLink = (playlistLink) => {
    const regex = /^https:\/\/open\.spotify\.com\/playlist\/[A-Za-z0-9_-]+(\?si=[A-Za-z0-9_-]+)*$/;

    setPlaylistLink(playlistLink)    

    const regexCorrect = regex.test(playlistLink)

    setButtonCanBeClicked(regexCorrect)
  }

  // Playlist Stats Fetch
  let getPlaylistStats = () => {
    const token = getTokenFromURL();

    setLoading(true);

    // If a playlist has already been loaded one time AND token is valid
    if (fetchPlaylistData > 0) {
      if (token){
        setLoaded(false);
      }
    }

    var test_data = {
      "playlist_link": playlistLink,
      "access_token": token,
    }

    axios
      .post("http://localhost:8000/playlist_get_info/", test_data)
      .then((response) => setData(response.data))
      .catch((error) => setError(error.message))
      .finally(() => {
        setLoading(false)
        setLoaded(true)
        fetchPlaylistData = 1;
      });
  }

  return (
    <div>
      <Header changePlaylistLink={changePlaylistLink} 
              playlistLink={playlistLink} 
              getPlaylistStats={getPlaylistStats}
              buttonCanBeClicked={buttonCanBeClicked}
      />
      <Stats key={loaded} 
             data={data} 
             error={error} 
             loaded={loaded} 
             loading={loading}
      />
    </div>
  );

}

export default App;