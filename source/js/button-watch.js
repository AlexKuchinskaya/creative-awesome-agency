const buttonWatch = document.querySelector('.video-agency__button');
const popupVideo = document.querySelector('.video-agency__popup');
console.log('buttonWatch', buttonWatch);
console.log('popupVideo', popupVideo);

buttonWatch.addEventListener('click', () => {
    popupVideo.style.display="block";
})

//добавить файлы js в watcher
//убирать кнопку при открытии видео
// стили появления видео