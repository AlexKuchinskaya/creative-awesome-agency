const buttonWatch = document.querySelector('.video-agency__button');
const popupVideo = document.querySelector('.video-agency__popup');
const popupClose = document.querySelector('.video-agency__popup-close');
const youtubePlayer = document.getElementById('player');
console.log('player', youtubePlayer);
console.log('popupVideo', popupVideo);
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// popupVideo.appendChild(tag);
// var player;
// function onYouTubeIframeAPIReady() {
// player = new YT.Player(playerHtml, {
//     events: {
//     'onStateChange': onPlayerStateChange
//     }
// });
// }
// let player 
// const onYouTubePlayerAPIReady = () => {
//     player = new YT.Player(youtubePlayer, {
//       events: {'onReady': onPlayerReady}
//     });
//     // return player
// }
// onYouTubePlayerAPIReady();
// console.log('player', player)

//   function onPlayerReady(event) {
//     document.getElementById("playYoutube").addEventListener("click", function() {player.playVideo();});
//     document.getElementById("pauseYoutube").addEventListener("click", function() {player.pauseVideo();});
// }
buttonWatch.addEventListener('click', () => {
    popupVideo.style.display="block";
})

popupClose.addEventListener('click', () => {
    youtubePlayer.src = youtubePlayer.src;
    popupVideo.style.display="none";

})



//убирать кнопку при открытии видео
// стили появления видео