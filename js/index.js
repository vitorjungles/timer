// Exchanging year
var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.getElementById("copyright").after(year);

// Permission variable
var verify = true;

// Input validation
function validate() {
  if (isNaN(document.getElementById("minutes").value)) {
    document.getElementById("minutes").value = '';
  };
  return isNaN(document.getElementById("minutes").value) ? false : true;
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

// Start Button function
document.getElementById("inicial").onclick = function() {
  var hours = document.querySelectorAll("input").item(0);
  var hrs = document.querySelectorAll("input").item(0).value;
  var minutes = document.querySelectorAll("input").item(1);
  var min = document.querySelectorAll("input").item(1).value;
  var seconds = document.querySelectorAll("input").item(2);
  var sec = document.querySelectorAll("input").item(2).value;
  var TimeSectionDiv = document.querySelector("div");
  if (document.getElementById("alert").textContent!='Enter the desired time below:') {
    exchange(document.getElementById("alert"), 'Enter the desired time below:');
  };
  if ((minutes.value!='00' || seconds.value!='00' || hours.value!='00') && verify) {
    TimeSectionDiv.hidden=true;
    verify=false;
    var Count = document.createElement("h1");
    var Button = document.getElementById("inicial");
    hrs = parseInt(hrs);
    min = parseInt(min);
    sec = parseInt(sec);
    var total = (hrs*60*60)+(min*60)+sec;
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

    var interval = setInterval(e, 1000);

    function e() {
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
        clearInterval(interval);

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
    Button.value = 'Pause';
  } else {
    exchange(document.getElementById("alert"), 'Enter the desired time below, please:', 'red');
  };
};

// Reset Button function
document.getElementById("reset").onclick = function() {
  location.reload();
};