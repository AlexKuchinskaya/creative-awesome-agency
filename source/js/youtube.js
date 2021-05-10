var tag = document.createElement('script');
const buttonWatch = document.querySelector('.video-agency__button');
const popupVideo = document.querySelector('.video-agency__popup');
const popupClose = document.querySelector('.video-agency__popup-close');
const youtubePlayer = document.getElementById('player');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementById('youtube');
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


const onDocumentClick = (evt) => {
    player.stopVideo();
    popupVideo.style.display="none";
    
}

function onYouTubePlayerAPIReady() {
    player = new YT.Player(youtubePlayer, {
      events: {'onReady': onPlayerReady}
    });
  }
  function onPlayerReady(event) {
    buttonWatch.addEventListener("click", () => {
        event.target.playVideo();
        popupVideo.style.display="block";
    });
    popupClose.addEventListener("click", () => {
        event.target.stopVideo();
        popupVideo.style.display="none";
    });
  }