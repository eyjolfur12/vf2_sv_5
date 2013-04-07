//Load player api asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var done = false;
var player;
var tmp;

function onYouTubeIframeAPIReady(link) {    
    if (link != null) {
        tmp = link;
    }
    player = new YT.Player('player', {        
        videoId: tmp,
        allowScriptAccess: "always",
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(evt) {
    evt.target.playVideo();
}

function onPlayerStateChange(evt) {
    if (evt.data == YT.PlayerState.PLAYING && !done) {
        // TODO           
    }
}
function stopVideo() {
    player.stopVideo();
}

function faster() {
    var currentSpeed = player.getPlaybackRate();
    currentSpeed = currentSpeed + 0.5;
    try {
        player.setPlaybackRate(currentSpeed);       
    } 
    catch (e) {
        console.log(e.message);
    }
}