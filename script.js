const video = document.querySelector('.background-video');

if (video) {
  video.addEventListener('canplay', () => {
    document.body.classList.add('video-ready');
  });

  video.play().catch(() => {
    document.body.classList.add('video-blocked');
  });
}
