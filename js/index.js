// Exchanging year text
document.getElementById("year").textContent = new Date().getFullYear();


document.getElementById("inicial").onclick = function() {
  var elem=original=document.getElementById("time").value;
  if (document.getElementById("alert").textContent!='Enter the desired time below:') {
    document.getElementById("alert").textContent = 'Enter the desired time below:';
    document.getElementById("alert").style.color = 'black';
  };
  if (elem!='') {
    var interval = setInterval(e, 1000);
    function e() {
      elem = elem[3]=='0' ? `${elem[0]}${elem[1]}${elem[2]}${elem[4]}`: elem;
      var ms = new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
      var m = new Date().getHours()+':'+new Date().getMinutes();
      var re = parseInt(elem.replace(/:/g, ''))-parseInt(m.replace(/:/g, ''));
      document.getElementById("count").textContent = 'Time left: '+re;
      console.log([elem, m, ms])
      if (elem==m) {
        clearInterval(interval);
        document.getElementById("history").textContent=='----' ? document.getElementById("history").textContent = `${document.getElementById("history").textContent.split(':').length-1+1} - ${original}` : document.getElementById("history").textContent += ` ${document.getElementById("history").textContent.split(':').length-1+1} - ${original}`;
        document.getElementById("time").value='';
      };
    };
  } else {
    document.getElementById("alert").style.color = 'red';
    document.getElementById("alert").textContent = 'Enter the desired time below, please:';
  };
};