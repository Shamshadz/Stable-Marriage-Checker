var prefer = [];
N = 4;
console.log(prefer);
for(var i=0;i<N;i++){
    prefer.push([]);
}
console.log(prefer);
prefer[1].push(22)
prefer[1].push(212)
prefer[1].push(2332)
console.log(prefer);
const index = prefer[1].indexOf(2332);
if (index > -1) { // only splice array when item is found
    prefer[1].splice(index, 1); // 2nd parameter means remove one item only
}
console.log(prefer);