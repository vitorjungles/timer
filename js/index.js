// Exchanging year
var year = document.createElement("span");
year.textContent = ` ${new Date().getFullYear()}`;
document.getElementById("copyright").after(year);

// Exchange text and color function
function exchange(variable, text, color='black') {
  variable.style.color=color;
  variable.textContent=text;
  return variable;
};

// Start Button function
document.getElementById("inicial").onclick = function() {
  var minutes = document.querySelectorAll("input").item(0);
  var seconds = document.querySelectorAll("input").item(1);
  var TimeSectionDiv = document.querySelector("div");
  var TimeSection = document.querySelector("section");
  if (document.getElementById("alert").textContent!='Enter the desired time below:') {
    exchange(document.getElementById("alert"), 'Enter the desired time below:');
  };
  if (((minutes.value!='00' && seconds.value!='00') || (minutes.value!='00' && seconds.value=='00') || (minutes.value=='00' && seconds.value!='00')) && (isNaN(minutes.value)==false && isNaN(seconds.value)==false)) {
    TimeSectionDiv.hidden=true;
    var Count = document.createElement("h1");
    Count.textContent = minutes.value+':'+seconds.value;
    TimeSectionDiv.before(Count);
  } else {
    exchange(document.getElementById("alert"), 'Enter the desired time below, please:', 'red');
  };
};

// Reset Button function
document.getElementById("reset").onclick = function() {
  location.reload();
};