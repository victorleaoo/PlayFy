# [PlayFy - Spotify Playlist's Stats](https://spotify-playlists-web-app.vercel.app/)

## What is it?

PlayFy is a web application where spotify users can see some interesting stats of their public playlists:

1. Top 5 Artists;
1. Top 5 Albums;
1. Most Popular Track;
1. Longest Track;
1. Shortest Track.

All you need to do to see these stats is login in with Spotify and input the playlist link.

![playfy-how](./media/playfy.gif)

## How to run it for developers

For running it locally, it's necessary to change **REACT_APP_MODE** for "local" at `frontend/src/App.js` (line 13) and at `frontend/src/components/statsComponents/SpotifyLogin.js` (line 3).

### Docker

To run PlayFy with Docker (assuming you already have it installed), follow the steps:

1. Inside the repo root folder (the one with the docker-compose.yml file), run: `docker compose up --build`. The `--build` is necessary only the first time you run it, from the second time ahead, you are able to run the app with `docker compose up`.
1. Wait until the Docker starts running and access PlayFy at the url `localhost:3000`.

### Python + NPM

Running **Python (back-end)**:

1. Enter the `/backend` folder.
1. Install the required libraries by using: `pip install -r requirements.txt`.
1. Run the fastapi application: `python3 main.py`.

Running **React/NPM (front-end)**:

1. Enter the `/frontend` folder.
1. Run the command: `npm install`.
1. Run the React application: `npm start`.

With both above running, you are able to access PlayFy at the url `localhost:3000`.

## Development and Technologies

### Endpoints

All used endpoints, either from the Spotify API or the one created for the back/front-end communication are documented at: [endpoints](https://github.com/victorleaoo/Spotify-Playlists-WebApp/blob/main/endpoints.ipynb).

### Python: Back-end

Python was the language used for the back-end development. The **fastapi** was the framework used for the endpoint creation.

Further, **pandas** was widely used for data manipulation.

### React: Front-end

React (JavaScript) was the framework used for the front-end.

### Docker

Docker was the tool applied to make the deployment easier.

## P.N. (Programmer's note:):

*Feel free to fork this project and improve it. If you make any modification on it and wants to share it with me, I'm all ears. :)*

*It was my first time using React and creating a full-stack project (especially when it comes to front-end), so more experienced developers might find something that can be better done.*