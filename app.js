const app = () => {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play");
  const outline = document.querySelector(".moving-outline circle");
  const video = document.querySelector(".video-container video");

  const sounds = document.querySelectorAll(".sound-picker button");
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength);

  //default song cuttoff 10 mimutes
  let cutOff = 600;

  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-sound");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      cutOff = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(cutOff / 60)}:${Math.floor(
        cutOff % 60
      )}`;
    });
  });

  const checkPlaying = (song) => {
    if (song.paused) {
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    } else {
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  };

  song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    console.log(currentTime);
    let elapsed = cutOff - currentTime;
    console.log(elapsed);
    let seconds = Math.floor(elapsed % 60);
    console.log(seconds);
    let minutes = Math.floor(elapsed / 60);
    console.log(minutes);
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if (currentTime >= cutOff) {
      song.pause();
      song.currentTime = 0;
      play.src = "./svg/play.svg";
      video.pause();
    }

    let progress = outlineLength - (currentTime / cutOff) * outlineLength;
    outline.style.strokeDashoffset = progress;
  };
};

app();
