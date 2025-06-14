// ReccoBeats API: https://api.reccobeats.com

const content = document.querySelector('#song')
const rewind = document.querySelector('.rewind')
const songButton = document.querySelector('#randomSong')
const randomPage = Math.floor(Math.random() * 10)

songButton.addEventListener('click', () => {
        reccoApi(`https://api.reccobeats.com/v1/artist/22cb65fe-d145-4a45-9721-b529bc1a9524/track?page=${randomPage}`)
        songButton.style.display ='none' 
    })

rewind.addEventListener('click', ()=>{
    window.location.reload()
})

const showSong = (song) => {
    const hrefEmbed = song.href.replace("/track/", "/embed/track/")
    const songInMinutes = new Date(song.durationMs)
    return `
        <iframe style="border-radius:12px" src="${hrefEmbed}?utm_source=generator" width="100%" height="252" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <div class="song-info--div">
            <span class="song-info song-title">${song.trackTitle}</span>
            <span class="song-info">${songInMinutes.getMinutes()}:${songInMinutes.getSeconds() < 10 ? "0" : ""}${songInMinutes.getSeconds()}</span>
            <span class="song-info song-link"><a href="${song.href}"><i class="fa-brands fa-spotify"></i> Listen on Spotify</a></span>
        </div>
    `
}

const reccoApi = (url) => {
    fetch(url)
        .then(response => response.json())
        .then((data) => data.content)
        .then((song) => {
            let songs = []
            song.filter((value) => {
                if(value.popularity > 23) {
                    songs.push(value)
                }
            })

            const randomSong = Math.floor(Math.random() * songs.length)
            content.innerHTML += showSong(songs[randomSong])
            console.log(songs[randomSong])
            
            rewind.style.display = 'block'
        })
        .catch(error => console.log(error))
}