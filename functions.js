
function play_hover_sound(){
    const audio_list = document.getElementById("audio_list");
    let hover_audio = document.createElement("audio")
    hover_audio.src = "https://milkyway42114.github.io/Test/hover.wav";
    audio_list.appendChild(hover_audio)
    hover_audio.play()
    setTimeout(function (){
        audio_list.removeChild(hover_audio)
    }, 500)
}

function load_all(){
    let under_text = document.getElementById("click");
    under_text.style.scale = "0"
}
