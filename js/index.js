document.getElementById("year").innerHTML = new Date().getFullYear();

var a=''+new Date().getHours()+':'+new Date().getMinutes();

document.getElementById("inicial").onclick = function() {
  console.log(document.getElementById("time").value)
  console.log(a);
  while (document.getElementById("time").value!=a) {
    a=''+new Date().getHours()+':'+new Date().getMinutes()
  };
  alert('Tempo atingido! ⏰');
};