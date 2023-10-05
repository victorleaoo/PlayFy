from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from fastapi.middleware.cors import CORSMiddleware

from playlists.stats import get_all_stats_together

app = FastAPI()

# Configurar middleware CORS
origins = ["http://localhost:3000"]  # Substitua pelo URL do seu aplicativo React

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],  # Adicione "OPTIONS" aqui
    allow_headers=["*"],  # Isso permite todos os cabeçalhos, ajuste conforme necessário
)

class PlaylistInfo(BaseModel):
    playlist_link: str
    access_token: str

@app.post("/playlist_get_info/")
async def create_item(playlist: PlaylistInfo):
    playlist_stats = get_all_stats_together(playlist.playlist_link, playlist.access_token)

    return JSONResponse(playlist_stats)