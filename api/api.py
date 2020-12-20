from flask import Flask
import youtube_dl


app = Flask(__name__)

@app.route("/download/<videoId>")
def download(videoId):
    ydl_opts = {
        "format": "best"
    }

    url = "https://www.youtube.com/watch?v=" + videoId

    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
        ydl.download([url])

    return {"status": "Ready."}
