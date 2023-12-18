var playBtnSufLen = "-play-btn".length;
var rangeSufLen = "-range".length;
var volBtnSufLen = "-vol-btn".length;

var lastVolume = 0.5;

function getSound(btnId, btnSufLen) {
    const sndId = btnId.substring(0, btnId.length - btnSufLen);
    const snd = document.getElementById(sndId);
    return {sndId, snd};
}

function getButton(event) {
    const btnId = event.target.id;
    const btn = document.getElementById(btnId);
    return {btnId, btn};
}

function stopPlay(event) {
    const {btnId, btn} = getButton(event);
    const {sndId, snd} = getSound(btnId, playBtnSufLen);

    if(btn.classList.contains("fa-play")) {
        btn.classList.remove("fa-play");
        btn.classList.add("fa-pause");

        snd.play();
        
    } else
        if(btn.classList.contains("fa-pause")) {
            btn.classList.remove("fa-pause");
            btn.classList.add("fa-play");

            snd.pause();
        }
}

function modifyVolume(event) {
    // TODO: Fix this not working
    //const {rangeId, range} = getButton(event);
    //alert(rangeId);
    rangeId = event.target.id;
    range = document.getElementById(rangeId);

    const {sndId, snd} = getSound(rangeId, rangeSufLen);
    //sndId = rangeId.substring(0, rangeId.length - rangeSufLen);
    //snd = document.getElementById(sndId);

    const btnId = sndId + "-vol-btn";
    const btn = document.getElementById(btnId);

    snd.volume = range.value / 100;
    lastVolume = snd.volume;

    //alert(snd.volume);

    btn.classList.remove("fa-volume-off");
    btn.classList.remove("fa-volume-low");
    btn.classList.remove("fa-volume-high");
    btn.classList.remove("fa-volume-xmark");

    if(lastVolume < 0.33 && lastVolume > 0)
        btn.classList.add("fa-volume-off");
    if(lastVolume >= 0.33 && lastVolume < 0.66)
        btn.classList.add("fa-volume-low");
    if(lastVolume >= 0.66)
        btn.classList.add("fa-volume-high");
    if(lastVolume === 0)
        btn.classList.add("fa-volume-xmark");
}

function muteVolume(event) {
    btnId = event.target.id;
    btn = document.getElementById(btnId);

    sndId = btnId.substring(0, btnId.length - volBtnSufLen);
    snd = document.getElementById(sndId);

    rangeId = sndId + "-range";
    range = document.getElementById(rangeId);

    if(btn.classList.contains("fa-volume-off") ||
        btn.classList.contains("fa-volume-low") || 
        btn.classList.contains("fa-volume-high"))
    {
        btn.classList.remove("fa-volume-off");
        btn.classList.remove("fa-volume-low");
        btn.classList.remove("fa-volume-high");

        btn.classList.add("fa-volume-xmark");
        snd.volume = 0;
        range.value = 0;
    } else
        if(btn.classList.contains("fa-volume-xmark")) {
            btn.classList.remove("fa-volume-xmark");
            
            if(lastVolume < 0.33 && lastVolume > 0) {
                btn.classList.add("fa-volume-off");
                snd.volume = lastVolume;
                range.value = lastVolume * 100;
            }
            if(lastVolume >= 0.33 && lastVolume < 0.66) {
                btn.classList.add("fa-volume-low");
                snd.volume = lastVolume;
                range.value = lastVolume * 100;
            }
            if(lastVolume >= 0.66) {
                btn.classList.add("fa-volume-high");
                snd.volume = lastVolume;
                range.value = lastVolume * 100;
            }
            if(lastVolume === 0) {
                btn.classList.add("fa-volume-xmark");
                snd.volume = lastVolume;
                range.value = lastVolume * 100;
            }
        }
}