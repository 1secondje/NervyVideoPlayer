const video = document.querySelector('.video');
const range = document.querySelector('.range');
const volume = document.querySelector('.volume');
const previous = document.querySelector('.previous');
const play = document.querySelector('.play');
const next = document.querySelector('.next');
const fullscreen = document.querySelector('.fullscreen');
const videos = [
	'video/voroni.mp4',
	'video/batarei.mp4',
	'video/slishkom.mp4',
	'video/coffee.mp4',
];
let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;

function setCurrentIndex(index) {
	currentIndex = index;
	localStorage.setItem('currentIndex', currentIndex);
}

function playVideo(index) {
	setCurrentIndex(index);
	video.setAttribute('src', videos[currentIndex]);
	video.load();
	video.play();
}

video.addEventListener('ended', () => {
	playVideo((currentIndex + 1) % videos.length);
});

volume.addEventListener('click', (e) => {
	if (e.target == volume) range.classList.toggle('hidden');
});

range.addEventListener('input', () => {
	video.volume = range.value;
});

previous.addEventListener('click', () => {
	playVideo((currentIndex - 1 + videos.length) % videos.length);
});

play.addEventListener('click', () => {
	play.classList.toggle('pause');
	if (play.classList.contains('pause')) {
		video.play();
	} else {
		video.pause();
	}
});

next.addEventListener('click', () => {
	playVideo((currentIndex + 1) % videos.length);
});

fullscreen.addEventListener('click', () => {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.mozRequestFullScreen) {
		video.mozRequestFullScreen();
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen();
	}
});

window.addEventListener('keydown', (e) => {
	if(e.code == 'Space') {
		play.classList.toggle('pause');
		if (play.classList.contains('pause')) {
			video.play();
		} else {
			video.pause();
		}
	}
})

document.querySelectorAll('.song__play').forEach((element, index) => {
	element.addEventListener('click', () => {
		playVideo(index);
	});
});

playVideo(currentIndex);