document.getElementById("logbutton").addEventListener("click", function() {
    console.log("click")
    var pw = document.getElementById("password").value;
    // var kvp = document.location
    console.log(pw)
    var path = '/auth/'+pw
    window.location.href = path
  });
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const valid = urlParams.get('valid')
console.log(valid)
if(valid=='false'){
    document.getElementById("pwerr").style.display ='block'
    document.getElementById("password").style.setProperty('--accent', 'red')
}