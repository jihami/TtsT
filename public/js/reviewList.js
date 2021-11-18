document.getElementById('hi').innerHTML="이순신";
var dbTestRef = database.ref('wlgka/')
dbTestRef.on('child_added', function(data){
console.log(data.val())
document.getElementById('hi').innerHTML=data.val();
});