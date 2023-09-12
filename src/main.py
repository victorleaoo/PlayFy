from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from playlists.stats import get_all_stats_together

import json

class PlaylistInfo(BaseModel):
    playlist_link: str
    access_token: str

app = FastAPI()

@app.post("/playlist_get_info/")
async def create_item(playlist: PlaylistInfo):
    playlist_stats = get_all_stats_together(playlist.playlist_link, playlist.access_token)

    return JSONResponse(playlist_stats)