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
    createDisplayThumbnail(tmp);
    var currentSpeed = player.getPlaybackRate();
   
    try {        
        player.setPlaybackRate(currentSpeed + 0.5);
        if (currentSpeed === player.getPlaybackRate()) {
            throw e;
        }
    } 
    catch (e) {
        console.log(e.message);
        alert("Ekki hægt að auka hraða");
    }
}

function getRelatedVideos() {

}

// Create a thumbnail for a video snippet.
/*
function createDisplayThumbnail(videoSnippet) {
    var titleEl = $('<h3>');
    titleEl.addClass('video-title');
    $(titleEl).html(videoSnippet.title);
    var thumbnailUrl = videoSnippet.thumbnails.medium.url;

    var div = $('<div>');
    div.addClass('video-content');
    div.css('backgroundImage', 'url("' + thumbnailUrl + '")');
    div.append(titleEl);
    $('#video-container').append(div);
}*/