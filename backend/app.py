import os
from dotenv import load_dotenv
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware 
import torch
from diffusers import DiffusionPipeline
from io import BytesIO
import base64

load_dotenv()
api_key = os.environ.get('API_KEY')

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials = True,
    allow_origins = ["*"],
    allow_methods = ["*"],
    allow_headers = ["*"]
)

#for model
pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-xl-base-1.0", torch_dtype=torch.float16, use_safetensors=True, variant="fp16")
pipe.to("cuda")

@app.get("/")
def generate(prompt: str):
    image = pipe(prompt=prompt).images[0]
    
    #encode img to pass back in res
    buffer = BytesIO()
    image.save(buffer, format = "PNG")
    imgstr = base64.b64encode(buffer.getvalue())

    return Response(content = imgstr, media_type = "image/png")