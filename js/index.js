// Exchanging year
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
  $("input[name='data']").on('input', function(e) {
    $(this).val($(this).val().replace(/[^0-9]/g, ''));
  });
});

// Exchange text and color function
function exchange(variable, text, color='black') {
  variable.style.color=color;
  variable.textContent=text;
  return variable;
};

// Reset function
function Reset(interval=false, div, c, btn, int, h, m, s, t, values=false, sound=false) {
  div.hidden = false;
  c.remove();
  btn.value = 'Start';
  interval&&int!='' ? int.pause() : h=h;
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

// Start Button function
document.querySelector("#inicial").addEventListener('click', function time() {
  var hrs = document.querySelectorAll("input").item(0).value, min = document.querySelectorAll("input").item(1).value, sec = document.querySelectorAll("input").item(2).value, TimeSectionDiv = document.querySelector("div");
  if (document.querySelector("#alert").textContent!='Enter the desired time below:') {
    exchange(document.querySelector("#alert"), 'Enter the desired time below:');
  };
  if ((hrs!='00' || min!='00' || sec!='00')) {
    hrs=='' ? hrs='00' : hrs=hrs;
    min=='' ? min='00' : min=min;
    sec=='' ? sec='00' : sec=sec;
    TimeSectionDiv.hidden=true;
    hrs = parseInt(hrs);
    min = parseInt(min);
    sec = parseInt(sec);

    var Count = document.createElement("h1"), Button = document.querySelector("#inicial"), total = (hrs*60*60)+(min*60)+sec;

    if (sec>60) {
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
      var result = '';
      result = hrs+':'+min+':'+sec;
      result = result.split(':');
      if (result[0].length<2) {
        result[0] = '0'+result[0];
      };
      if (result[1].length<2) {
        result[1] = '0'+result[1];
      };
      if (result[2].length<2) {
        result[2] = '0'+result[2];
      };
      result = result.join(':');
      return result;
    };

    function Timer(callback, delay) {
      var timerId;
      var start;
      var remaining = delay;
    
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
      var timer = new Timer(co, 1000);

      function co() {
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
          Reset(true, TimeSectionDiv, Count, Button, timer, hrs, min, sec, total, false, true);
          Button.removeEventListener('click', p);
          Button.addEventListener('click', time);
          timer='';
        };
      };

      document.querySelector("#inicial").addEventListener("click", timer.resume());
      Button.value = 'Pause';
      Button.removeEventListener('click', time);
      Button.addEventListener('click', p);

      function p() {
        timer.pause();
        Button.value = 'Continue';
        Button.removeEventListener('click', p);
        Button.addEventListener('click', go);
      };

      function go() {
        timer.resume();
        Button.value = 'Pause';
        Button.removeEventListener('click', go);
        Button.addEventListener('click', p);
      };

      // Reset Button function
      document.querySelector("#reset").addEventListener('click', function() {
        Reset(true, TimeSectionDiv, Count, Button, timer, hrs, min, sec, total, false, false);
        hrs=min=sec=total=timer=0;
        timer='';
        Button.removeEventListener('click', p);
        Button.addEventListener('click', time);
      });
    } else {
      Reset(false, TimeSectionDiv, Count, Button, timer, hrs, min, sec, total, true, true);
    };
  } else {
    exchange(document.querySelector("#alert"), 'Enter the desired time below, please:', 'red');
  };
});