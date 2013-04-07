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

    // display player
    var pl = document.getElementById('video-containerID');    
    pl.style.display = 'block';

    // display speed ctrl buttons
    var speed = document.getElementById('speed');
    speed.style.display = 'block';

    // hide thumbs for next lectures
    var thumb = document.getElementById('thumb-container');
    thumb.style.display = 'none';
}

function onPlayerReady(evt) {
    evt.target.playVideo();
}
function onPlayerStateChange(evt) {
    if (evt.data == YT.PlayerState.PLAYING && !done) {
        // TODO           
    }

    if (evt.data === YT.PlayerState.ENDED) {       
        // hide player
        var pl = document.getElementById('video-containerID');
        pl.style.display = 'none';

        // hide speed ctrl buttons
        var speed = document.getElementById('speed');
        speed.style.display = 'none';

        // show list
        var thumb = document.getElementById('thumb-container');       
        thumb.style.display = 'block';
    }

}
function stopVideo() {
    player.stopVideo();
}
function slower() {

    var currentSpeed = player.getPlaybackRate();
    try {        
        player.setPlaybackRate(currentSpeed - 0.5);
        if (currentSpeed === player.getPlaybackRate()) {
            throw e;
        }
    } 
    catch (e) {
        console.log(e.message);
        alert("Ekki hægt að minka hraða");
    }
}

function faster() {
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

function getRelatedVideos(videoId) {

}

// Create a thumbnail for a video snippet.
function createDisplayThumbnail(videoId, videoIdList) {
    // alert(videoId);
    var titleEl = $('<h3>');
    titleEl.addClass('video-id');
    $(titleEl).html("VideoId: " + videoId);   
    
    var thumbnailUrl1 = "http://img.youtube.com/vi/" + videoId + "/1.jpg";
    var thumbnailUrl2 = "http://img.youtube.com/vi/" + videoIdList[1] + "/2.jpg";
    var thumbnailUrl3 = "http://img.youtube.com/vi/" + videoIdList[1] + "/3.jpg";

    var div = $('<div>');

    var img1 = $('<img src=' + thumbnailUrl1 + ' >');
    var img2 = $('<img src=' + thumbnailUrl2 + ' >');
    var img3 = $('<img src=' + thumbnailUrl3 + ' >');
   
    div.append(img1);
    div.append(img2);
    div.append(img3);

    $('#thumb-container').append(div);
}