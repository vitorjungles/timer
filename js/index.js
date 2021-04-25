let year = document.createElement("span");
const reload = sessionStorage.getItem("reload");

year.textContent = ` ${new Date().getFullYear()}`;

document.querySelector("#copyright").after(year);
document.querySelector("footer").hidden = false;

[0, 1, 2].forEach(element => {
  document.querySelectorAll("input[name='data']")[element].oninput = (e) => { document.querySelectorAll("input[name='data']")[element].value = document.querySelectorAll("input[name='data']")[element].value.replace(/[^0-9]/g, '') } 
});

function exchange(variable, text, color = 'black') {
  variable.style.color = color;
  variable.textContent = text;
  return variable;
};

function reset(div, c, btn, h, m, s, t, values = false, sound = false) {
  div.hidden = false;
  c.remove();
  btn.value = 'Start';
  if (values) {
    [0, 1, 2].forEach(element => { document.querySelectorAll("input[name='data']")[element].value = '00' });
  };
  h = m = s = t = 0;
  if (sound) {
    let context = new AudioContext(), oscillator = context.createOscillator(), contextGain = context.createGain();
    oscillator.type = 'square';
    oscillator.connect(contextGain);
    contextGain.connect(context.destination);
    contextGain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 3);
    oscillator.start(0);
  };
};

if (reload) {
  document.querySelectorAll("input")[0].value = sessionStorage.getItem("originalTime").substring(2, 0);
  document.querySelectorAll("input")[1].value = sessionStorage.getItem("originalTime").substring(5, 3);
  document.querySelectorAll("input")[2].value = sessionStorage.getItem("originalTime").substring(8, 6);
  ["originalTime", "reload"].forEach(element => { sessionStorage.removeItem(element) });
};

document.querySelector("#initial").addEventListener('click', function time() {
  let hrs = document.querySelectorAll("input")[0].value;
  let min = document.querySelectorAll("input")[1].value;
  let sec = document.querySelectorAll("input")[2].value;
  let timeSectionDiv = document.querySelector("div");

  if (document.querySelector("#alert").textContent != 'Enter the desired time below:') {
    exchange(document.querySelector("#alert"), 'Enter the desired time below:');
  };

  document.querySelector("#initial").removeEventListener("click", time);
  document.querySelector("#initial").addEventListener("click", time);

  if ((hrs != '00' || min != '00' || sec != '00')) {
    hrs = hrs == '' ? + '00' : + hrs;
    min = min == '' ? + '00' : + min;
    sec = sec == '' ? + '00' : + sec;

    timeSectionDiv.hidden = true;

    let count = document.createElement("h1");
    let button = document.querySelector("#initial");
    let total = (hrs * 60 * 60) + (min * 60) + sec;

    const original = display();

    if ((sec >= 60) || (min >= 60)) {
      let hours = hrs, minutes = min, seconds = sec;
      while (seconds >= 60) {
        seconds -= 60;
        minutes++;
      };
      while (minutes >= 60) {
        minutes -= 60;
        hours++;
      };
      hrs = hours;
      min = minutes;
      sec = seconds;
    };

    count.textContent = display();
    timeSectionDiv.before(count);

    function display() {
      let result = (hrs + ':' + min + ':' + sec).split(':');
      for (let c = 0; c < 3; c++) {
        if (result[c].length < 2) {
          result[c] = '0' + result[c];
        };
      };
      return result.join(':');
    };

    function Timer(callback, delay) {
      let timerId, start, remaining = delay;
      this.pause = () => {
        clearTimeout(timerId);
        remaining -= new Date() - start;
      };
      let resume = () => {
        start = new Date();
        timerId = setTimeout(() => {
          remaining = delay;
          resume();
          callback(timerId);
        }, remaining);
      };
      this.resume = resume;
      this.clear = () => { clearTimeout(timerId) };
    };

    if (total > 0) {
      let timer = new Timer(() => {
        if (min == 0 && sec == 0) {
          min = sec = 60;
          min -= 1;
          hrs -= 1;
        } else if (sec == 0) {
          sec = 60;
          min -= 1;
        };

        sec -= 1;
        total -= 1;

        count.textContent = display();

        if (total == 0) {
          reset(timeSectionDiv, count, button, hrs, min, sec, total, false, true);

          button.removeEventListener('click', pause);
          button.addEventListener('click', time);

          timer.clear();

          document.querySelectorAll("input")[0].value = original.substring(2, 0);
          document.querySelectorAll("input")[1].value = original.substring(5, 3);
          document.querySelectorAll("input")[2].value = original.substring(8, 6);
        };
      }, 1000);

      timer.resume();
      button.value = 'Pause';
      button.removeEventListener('click', time);
      button.addEventListener('click', pause, { once: true });

      function pause() {
        timer.pause();
        button.value = 'Continue';
        button.addEventListener('click', go, { once: true });
      };

      function go() {
        timer.resume();
        button.value = 'Pause';
        button.addEventListener('click', pause, { once: true });
      };

      document.querySelector("#reset").addEventListener('click', () => {
        sessionStorage.setItem("originalTime", original);
        sessionStorage.setItem("reload", 'true');
        location.reload();
      }, { once: true });
    } else {
      reset(timeSectionDiv, count, button, hrs, min, sec, total, true, true);
    };
  } else {
    exchange(document.querySelector("#alert"), 'Enter the desired time below, please:', 'red');
  };
});