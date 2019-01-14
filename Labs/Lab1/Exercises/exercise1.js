var sentence = "the quick brown fox"

var x = sentence.split(' ');
var y="";

for (const key in x) {
    //console.log(x[key])
    y += x[key].charAt(0).toUpperCase() + x[key].substring(1)+" "

    
}
console.log(y)