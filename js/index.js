var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

// Input validation
function validate() {
  if (isNaN(document.querySelector("#minutes").value)) {
    document.querySelector("#minutes").value = '';
  };
  return isNaN(document.querySelector("#minutes").value) ? false : true;
};
$(function() {
  $("input[name='data']").on('input', function(e) { $(this).val($(this).val().replace(/[^0-9]/g, '')); });
});

function exchange(variable, text, color='black') {
  variable.style.color=color;
  variable.textContent=text;
  return variable;
};

function Reset(div, c, btn, h, m, s, t, values=false, sound=false) {
  div.hidden = false;
  c.remove();
  btn.value = 'Start';
  values ? [0, 1, 2].forEach(function(array) { document.querySelectorAll("input[name='data']").item(array).value='00' }) : h=h;
  h=m=s=t=0;
  if (sound) {
    let context = new AudioContext(), oscillator = context.createOscillator(), contextGain = context.createGain();
    oscillator.type = 'square';
    oscillator.connect(contextGain);
    contextGain.connect(context.destination);
    contextGain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime+3);
    oscillator.start(0);
  };
};

document.querySelector("#initial").addEventListener('click', function time() {
  var hrs = document.querySelectorAll("input").item(0).value, min = document.querySelectorAll("input").item(1).value, sec = document.querySelectorAll("input").item(2).value, TimeSectionDiv = document.querySelector("div");
  if (document.querySelector("#alert").textContent!='Enter the desired time below:') {
    exchange(document.querySelector("#alert"), 'Enter the desired time below:');
  };

  if ((hrs!='00' || min!='00' || sec!='00')) {
    var CurrentEvent = time;
    hrs = hrs=='' ? parseInt('00') : parseInt(hrs);
    min = min=='' ? parseInt('00') : parseInt(min);
    sec = sec=='' ? parseInt('00') : parseInt(sec);
    TimeSectionDiv.hidden=true;

    var Count = document.createElement("h1"), Button = document.querySelector("#initial"), total = (hrs*60*60)+(min*60)+sec;

    if ((sec>=60) || (min>=60)) {
      var hours=hrs, minutes=min, seconds=sec;
      while (seconds>=60) {
        seconds-=60;
        minutes+=1;
      };
      while (minutes>=60) {
        minutes-=60;
        hours+=1;
      };
      hrs=hours;
      min=minutes;
      sec=seconds;
    };

    Count.textContent = display();
    TimeSectionDiv.before(Count);

    function display() {
      var result = (hrs+':'+min+':'+sec).split(':');
      if (result[0].length<2) {
        result[0] = '0'+result[0];
      };
      if (result[1].length<2) {
        result[1] = '0'+result[1];
      };
      if (result[2].length<2) {
        result[2] = '0'+result[2];
      };
      return result.join(':');
    };

    // Timer
    function Timer(callback, delay) {
      var timerId, start, remaining = delay;
      this.pause = function () {
        window.clearTimeout(timerId);
        remaining -= new Date() - start;
      };
      var resume = function () {
        start = new Date();
        timerId = window.setTimeout(function () {
          remaining = delay;
          resume();
          callback();
        }, remaining);
      };
      this.resume = resume;
      this.reset = function () {
        remaining = delay;
      };
    };

    if (total!=0) {

      // Timer function
      var timer = new Timer(function() {
        if (min==0 && sec==0) {
          min=sec=60;
          min-=1;
          hrs-=1;
        } else if (sec==0) {
          sec=60;
          min-=1;
        };

        sec-=1;
        total-=1;

        Count.textContent = display();

        if (total==0) {
          Reset(TimeSectionDiv, Count, Button, hrs, min, sec, total, false, true);
          Button.removeEventListener('click', p);
          Button.addEventListener('click', time);
          timer=0;
        };
      }, 1000);

      // Initial start
      timer.resume();
      Button.value = 'Pause';
      Button.removeEventListener('click', time);
      Button.addEventListener('click', p);

      // Pause function
      function p() {
        timer!=0 ? timer.pause() : CurrentEvent=CurrentEvent;
        Button.value = 'Continue';
        Button.removeEventListener('click', p);
        Button.addEventListener('click', go);
        CurrentEvent = go;
      };

      // Play function
      function go() {
        timer!=0 ? timer.resume() : CurrentEvent=CurrentEvent;
        Button.value = 'Pause';
        Button.removeEventListener('click', go);
        Button.addEventListener('click', p);
        CurrentEvent = p;
      };

      document.querySelector("#reset").addEventListener('click', function() {
        Reset(TimeSectionDiv, Count, Button, hrs, min, sec, total, false, false);
        hrs=min=sec=total=timer=0;
        Button.removeEventListener('click', CurrentEvent);
        Button.addEventListener('click', time);
      });
    } else {
      Reset(TimeSectionDiv, Count, Button, hrs, min, sec, total, true, true);
    };
  } else {
    exchange(document.querySelector("#alert"), 'Enter the desired time below, please:', 'red');
  };
});