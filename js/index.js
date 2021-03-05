document.getElementById("year").innerHTML = new Date().getFullYear();
document.getElementById("inicial").onclick = function() {
  var elem=original=document.getElementById("time").value;
  if (document.getElementById("alert").innerHTML!='Insira o tempo desejado abaixo:') {
    document.getElementById("alert").innerHTML = 'Insira o tempo desejado abaixo:';
    document.getElementById("alert").style.color = 'black';
  };
  if (elem!='') {
    var interval = setInterval(e, 1000);
    function e() {
      elem = elem[3]=='0' ? `${elem[0]}${elem[1]}${elem[2]}${elem[4]}`: elem;
      var ms = new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
      var m = new Date().getHours()+':'+new Date().getMinutes();
      var re = parseInt(elem.replace(/:/g, ''))-parseInt(m.replace(/:/g, ''));
      document.getElementById("count").innerHTML = 'Tempo restante: '+re;
      console.log([elem, m, ms])
      if (elem==m) {
        clearInterval(interval);
        document.getElementById("history").innerHTML=='----' ? document.getElementById("history").innerHTML = `${document.getElementById("history").innerHTML.split(':').length-1+1} - ${original}` : document.getElementById("history").innerHTML += `<br>${document.getElementById("history").innerHTML.split(':').length-1+1} - ${original}`;
        document.getElementById("time").value='';
      };
    };
  } else {
    document.getElementById("alert").innerHTML = 'Insira o tempo desejado abaixo, por favor:';
    document.getElementById("alert").style.color = 'red';
  }
};