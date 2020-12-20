import youtube_dl


ydl_opts = {'format': 'best'}

with youtube_dl.YoutubeDL(ydl_opts) as ydl:
    ydl.download(["https://www.youtube.com/watch?v=vcBGj4R7Fo0"])
