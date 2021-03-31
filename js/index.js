var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

var reload = sessionStorage.getItem("Reload");

function validate() {
  if (isNaN(document.querySelector("#minutes").value)) {
    document.querySelector("#minutes").value = '';
  };
  return isNaN(document.querySelector("#minutes").value) ? false : true;
};
$(function() {
  $("input[name='data']").on('input', function (e) { $(this).val($(this).val().replace(/[^0-9]/g, '')) });
});

function exchange(variable, text, color = 'black') {
  variable.style.color = color;
  variable.textContent = text;
  return variable;
};

function Reset(div, c, btn, h, m, s, t, values = false, sound = false) {
  div.hidden = false;
  c.remove();
  btn.value = 'Start';
  if (values) {
    [0, 1, 2].forEach(function (array) { document.querySelectorAll("input[name='data']").item(array).value = '00' });
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
  document.querySelectorAll("input").item(0).value = sessionStorage.getItem("OriginalTime").substring(2, 0);
  document.querySelectorAll("input").item(1).value = sessionStorage.getItem("OriginalTime").substring(5, 3);
  document.querySelectorAll("input").item(2).value = sessionStorage.getItem("OriginalTime").substring(8, 6);
  ["OriginalTime", "Reload"].forEach(function (array) { sessionStorage.removeItem(array) });
};

document.querySelector("#initial").addEventListener('click', function time() {
  var hrs = document.querySelectorAll("input").item(0).value;
  var min = document.querySelectorAll("input").item(1).value;
  var sec = document.querySelectorAll("input").item(2).value;
  var TimeSectionDiv = document.querySelector("div");

  if (document.querySelector("#alert").textContent != 'Enter the desired time below:') {
    exchange(document.querySelector("#alert"), 'Enter the desired time below:');
  };

  document.querySelector("#initial").removeEventListener("click", time);
  document.querySelector("#initial").addEventListener("click", time);

  if ((hrs != '00' || min != '00' || sec != '00')) {
    hrs = hrs == '' ? parseInt('00') : parseInt(hrs);
    min = min == '' ? parseInt('00') : parseInt(min);
    sec = sec == '' ? parseInt('00') : parseInt(sec);

    TimeSectionDiv.hidden=true;

    var Count = document.createElement("h1");
    var Button = document.querySelector("#initial");
    var total = (hrs * 60 * 60) + (min * 60) + sec;
    var Original = display();

    if ((sec >= 60) || (min >= 60)) {
      var hours = hrs, minutes = min, seconds = sec;
      while (seconds>=60) {
        seconds -= 60;
        minutes += 1;
      };
      while (minutes >= 60) {
        minutes -= 60;
        hours += 1;
      };
      hrs = hours;
      min = minutes;
      sec = seconds;
    };

    Count.textContent = display();
    TimeSectionDiv.before(Count);

    function display() {
      var result = (hrs + ':' + min + ':' + sec).split(':');
      for (let c = 0; c < 3; c++) {
        if (result[c].length < 2) {
          result[c] = '0' + result[c];
        };
      };
      return result.join(':');
    };

    function Timer(callback, delay) {
      var timerId, start, remaining = delay;
      this.pause = function () {
        clearTimeout(timerId);
        remaining -= new Date() - start;
      };
      var resume = function () {
        start = new Date();
        timerId = setTimeout(function () {
          remaining = delay;
          resume();
          callback(timerId);
        }, remaining);
      };
      this.resume = resume;
      this.clear = function () { clearTimeout(timerId) };
    };

    if (total > 0) {
      var timer = new Timer(function () {
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

        Count.textContent = display();

        if (total == 0) {
          Reset(TimeSectionDiv, Count, Button, hrs, min, sec, total, false, true);
          Button.removeEventListener('click', pause);
          Button.addEventListener('click', time);
          timer.clear();
        };
      }, 1000);

      timer.resume();
      Button.value = 'Pause';
      Button.removeEventListener('click', time);
      Button.addEventListener('click', pause, { once: true });

      function pause() {
        timer.pause();
        Button.value = 'Continue';
        Button.addEventListener('click', go, { once: true });
      };

      function go() {
        timer.resume();
        Button.value = 'Pause';
        Button.addEventListener('click', pause, { once: true });
      };

      document.querySelector("#reset").addEventListener('click', function stop() {
        sessionStorage.setItem("OriginalTime", Original);
        sessionStorage.setItem("Reload", 'true');
        location.reload();
      }, { once: true });
    } else {
      Reset(TimeSectionDiv, Count, Button, hrs, min, sec, total, true, true);
    };
  } else {
    exchange(document.querySelector("#alert"), 'Enter the desired time below, please:', 'red');
  };
});