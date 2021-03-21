// Exchanging year
var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.querySelector("#copyright").after(year);

// Permission variable
var verify = true;

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
  interval ? clearInterval(int) : h=h;
  values ? [0, 1, 2].forEach(function(array) { document.querySelectorAll("input[name='data']").item(array).value='00' }) : h=h;
  h=m=s=t=0;
  if (sound) {
    let context = new AudioContext(),
      oscillator = context.createOscillator(),
      contextGain = context.createGain();

    oscillator.type = 'square';
    oscillator.connect(contextGain);
    contextGain.connect(context.destination);
    contextGain.gain.exponentialRampToValueAtTime(
      0.00001, context.currentTime + 3
    );
    oscillator.start(0);
  };
};

// Start Button function
document.querySelector("#inicial").addEventListener('click', function() {
  var hrs = document.querySelectorAll("input").item(0).value,
    min = document.querySelectorAll("input").item(1).value,
    sec = document.querySelectorAll("input").item(2).value,
    TimeSectionDiv = document.querySelector("div");
  if (document.querySelector("#alert").textContent!='Enter the desired time below:') {
    exchange(document.querySelector("#alert"), 'Enter the desired time below:');
  };
  if ((hrs!='00' || min!='00' || sec!='00') && verify) {
    hrs=='' ? hrs='00' : hrs=hrs;
    min=='' ? min='00' : min=min;
    sec=='' ? sec='00' : sec=sec;
    TimeSectionDiv.hidden=true;
    verify=false;
    var Count = document.createElement("h1"),
      Button = document.querySelector("#inicial");
    hrs = parseInt(hrs);
    min = parseInt(min);
    sec = parseInt(sec);
    var total = (hrs*60*60)+(min*60)+sec;

    if (sec>60) {
      var hours = hrs;
      var minutes = min;
      var seconds = sec;
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

    var interval = total!=0 ? setInterval(e, 1000) : Reset(false, TimeSectionDiv, Count, Button, interval, hrs, min, sec, total, true, true);

    function e() {
      if (min==0 && sec==0) {
        min=sec=60;
        min-=1;
        hrs-=1;
      } else if (sec==0) {
        sec=60;
        min-=1;
      };
      console.log(hrs, min, sec, total);

      sec-=1;
      total-=1;
      
      Count.textContent = display();

      // Reset Button function
      document.querySelector("#reset").addEventListener('click', function() {
        Reset(true, TimeSectionDiv, Count, Button, interval, hrs, min, sec, total, false, false);
      });

      Button.value = 'Pause';
      if (total==0) {
        Reset(true, TimeSectionDiv, Count, Button, interval, hrs, min, sec, total, false, true);
      };
    };
    verify = true;
  } else {
    exchange(document.querySelector("#alert"), 'Enter the desired time below, please:', 'red');
  };
});