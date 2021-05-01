// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
const buttonWatch = document.querySelector('.video-agency__button');
const popupVideo = document.querySelector('.video-agency__popup');
const popupClose = document.querySelector('.video-agency__popup-close');
const youtubePlayer = document.getElementById('player');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementById('youtube');
console.log('firstScriptTag', firstScriptTag)
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
// var player;
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player(youtubePlayer, {
//     height: '360',
//     width: '640',
//     videoId: 'M7lc1UVf-VE',
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

// 4. The API will call this function when the video player is ready.
// function onPlayerReady(event) {
//   event.target.playVideo();
// }

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
// var done = false;
// function onPlayerStateChange(event) {
//   if (event.data == YT.PlayerState.PLAYING && !done) {
//     setTimeout(stopVideo, 6000);
//     done = true;
//   }
// }
// function stopVideo() {
//   player.stopVideo();
// }

const onDocumentClick = (evt) => {
    player.stopVideo();
    popupVideo.style.display="none";
    
}
// const onKeydown = (evt) => {
//     if (evt.keyCode === ESCAPE_BUTTON) {
//       popupElement.remove();
//       document.removeEventListener(`keydown`, onKeydown);
//     }
//   };
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
    // if (popupVideo.style.display="block") { 
    //     document.addEventListener(`click`, (evt) => {
    //         evt.preventDefault();
           
    //         console.log('hello')
    //         // onDocumentClick
    //         }
    //     );
    // }
    
    // document.removeEventListener('click', onDocumentClick)
  }