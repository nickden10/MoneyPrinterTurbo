import asyncio, json, os, sys
import edge_tts

OUT = sys.argv[1]
RATE = sys.argv[2] if len(sys.argv) > 2 else "+0%"
VOICE = "tr-TR-EmelNeural"
BEATS = [
    ("B1", "Canlı filtrenin bir kareyi bitirmek için otuz üç milisaniyeden az vakti var."),
    ("B2", "Saniyede otuz kare, kare başına yaklaşık otuz üç milisaniye demek."),
    ("B3", "Yakından bak: pikseller."),
    ("B4", "Önce bir yüz modeli, örneğin Midiya Payp, yüzün üstünde dört yüz yetmiş sekiz nokta işaretler."),
    ("B5", "Sonra bilateral gibi bir filtre cildi tarar: kenarlar kalır, doku silinir. Gözenekler, çiller, ince tüyler."),
    ("B6", "Ardından noktalar kaydırılır, görüntü esner: gözler büyür, çene daralır."),
    ("B7", "En son ışık eklenir, gölgeler yumuşar."),
    ("B8", "Bunu saniyede otuz kez yapar, her karede yeniden."),
    ("B9a", "Filtredeki yüz, hesaplanmış bir yüz."),
    ("B9b", "Gerçek ciltte doku vardır, olmalı da."),
]
only = sys.argv[3].split(",") if len(sys.argv) > 3 else None


async def one(bid, text):
    c = edge_tts.Communicate(text, VOICE, rate=RATE, boundary="WordBoundary", proxy=os.environ.get("HTTPS_PROXY"))
    words = []
    with open(f"{OUT}/{bid}.mp3", "wb") as f:
        async for ch in c.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                words.append({"text": ch["text"], "start": ch["offset"] / 1e7, "end": (ch["offset"] + ch["duration"]) / 1e7})
    json.dump(words, open(f"{OUT}/{bid}.json", "w"), ensure_ascii=False, indent=1)


async def main():
    os.makedirs(OUT, exist_ok=True)
    for bid, text in BEATS:
        if only and bid not in only:
            continue
        for attempt in range(3):
            try:
                await one(bid, text)
                break
            except Exception as e:
                print("retry", bid, e)
                await asyncio.sleep(2)

asyncio.run(main())
