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
  var minutes = document.querySelectorAll("input").item(0);
  var seconds = document.querySelectorAll("input").item(1);
  var TimeSectionDiv = document.querySelector("div");
  if (document.getElementById("alert").textContent!='Enter the desired time below:') {
    exchange(document.getElementById("alert"), 'Enter the desired time below:');
  };
  if ((minutes.value!='00' || seconds.value!='00') && verify) {
    TimeSectionDiv.hidden=true;
    verify=false;
    var Count = document.createElement("h1");
    var Button = document.getElementById("inicial");
    Button.value = 'Pause';
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