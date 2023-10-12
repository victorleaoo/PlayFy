from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from fastapi.middleware.cors import CORSMiddleware

from playlists.stats import get_all_stats_together

app = FastAPI()

# CORS Middleware Config
origins = ["http://localhost:3000", "http://0.0.0.0:3000", "http://localhost:3000/"]  

# App Middleware Config
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  
    allow_headers=["*"],  
)

class PlaylistInfo(BaseModel):
    playlist_link: str
    access_token: str

# Get playlist link and access token and returns stats in JSON
@app.post("/playlist_get_info/")
async def create_item(playlist: PlaylistInfo):
    playlist_stats = get_all_stats_together(playlist.playlist_link, playlist.access_token)

    return JSONResponse(playlist_stats)