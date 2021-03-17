// Exchanging year text
document.getElementById("year").textContent = new Date().getFullYear();

// Permission variable
var v=true;

// Exchange text and color function
function exchange(variable, text, color='black') {
  variable.style.color=color;
  variable.textContent=text;
  return variable;
};

// Button click function
document.getElementById("inicial").onclick = function() {
  if (v) {
    var elem=original=document.getElementById("time").value;
    if (document.getElementById("alert").textContent!='Enter the desired time below:') {
      exchange(document.getElementById("alert"), 'Enter the desired time below:');
    };
    if (elem!='') {
      v=false;
      // First interval
      var interval = setInterval(e, 1000);
      function e() {
        elem = elem[3]=='0' ? `${elem[0]}${elem[1]}${elem[2]}${elem[4]}`: elem;
        var ms = new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
        var m = new Date().getHours()+':'+new Date().getMinutes();
        ms = ms.split(':');
        if (ms[1].length<2) {
          ms[1] = '0'+ms[1];
        } else if (ms[2].length<2) {
          ms[2] = '0'+ms[2];
        };
        ms = ms.join(':');
        document.getElementById("count").textContent=`Now: ${ms}`;
        console.log([elem, m, ms]);
        if (elem==m) {
          clearInterval(interval);
          v=true;
        };
      };
    } else {
      exchange(document.getElementById("alert"), 'Enter the desired time below, please:', 'red');
    };
  };
};