function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.classList.add('fade-out');
  setTimeout(() => {
    loader.style.display = 'none';
  }, 1000);
}

(function () {
  'use strict';
  console.log('reading');

  const myVideo = document.querySelector('#myVideo');
  const line1 = document.querySelector('#line1');
  const line2 = document.querySelector('#line2');
  const line3 = document.querySelector('#line3');

  const poem = {
    start: [0, 5, 8],
    stop: [4, 7, 10],
    line: [line1, line2, line3]
  };

  myVideo.addEventListener('playing', function () {
    setInterval(checkTime, 100);
  });
  
  function checkTime() {
    for (let i = 0; i < poem.start.length; i++) {
      if (poem.start[i] < myVideo.currentTime && myVideo.currentTime < poem.stop[i]) {
        poem.line[i].classList.add('showing');
        poem.line[i].classList.remove('hidden');
      } else {
        poem.line[i].classList.remove('showing');
        poem.line[i].classList.add('hidden');
      }
    }
  }
})();