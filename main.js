let N = 0;
var dict = {};
let valuePerson = -1;
var prefer = [];

addNoPeople = (event) => {
    event.preventDefault();

    N = document.getElementById('noPeople').value;
    
    if(Object.keys(dict).length){
        dict = {}
    }

    prefer = []
    
    let opt = document.getElementById('addMenPrefer');
    for(var i=N;i<2*N;i++){
        opt.innerHTML -=``
    }  

    let opt1 = document.getElementById('addWomenPrefer');
    for(var i=0;i<N;i++){
        opt1.innerHTML -=``
    }

    document.getElementById('dispMenNames').style.display = 'none';
    document.getElementById('dispWomenNames').style.display = 'none';

    document.getElementById('addMenNames').style.display = 'block';
    document.getElementById('addWomenNames').style.display = 'block';

    for(var i=0;i<N;i++){
        const div = document.getElementById("addMenForm");
        div.innerHTML -= ``
    }

    for(var i=0;i<N;i++){
        const div = document.getElementById("addWomenForm");
        div.innerHTML -= ``
    }

    for(var i=0;i<N;i++){
        const div = document.getElementById("addMenForm");
        div.innerHTML += `<input id="addMenName${i}" type="text" required>`
    }

    for(var i=0;i<N;i++){
        const div = document.getElementById("addWomenForm");
        div.innerHTML +=  `<input id="addWomenName${i}" type="text" required>`
    }

    for(var i=0;i<2*N;i++){
        prefer.push([]);
    }

    document.getElementById('addNames').style.display = "block";

}

function addNames(){
    N = parseInt(N);
    for(var i=0;i<N;i++){
        let addName = document.getElementById(`addMenName${i}`).value;
        dict[i] = addName;
    }

    for(var i=0;i<N;i++){
        let addName = document.getElementById(`addWomenName${i}`).value;
        console.log(addName);
        dict[i+N] = addName;
    }
    console.log(dict);
    addPrefer(dict);
    result = document.getElementById('resultBtn').style.display = "block";
}

getResult = () => {
    stableMarriage(N,prefer);
}

function addPrefer(dict){

    document.getElementById('addMenNames').style.display = 'none';
    document.getElementById('addWomenNames').style.display = 'none';

    for(var i=0;i<N;i++){
        const div = document.getElementById("dispMenNamesForm");
        div.innerHTML -= ``
    }
    
    for(var i=0;i<N;i++){
        const div = document.getElementById("dispWomenNamesForm");
        div.innerHTML -= ``
    }

    document.getElementById('dispMenNames').style.display = 'block';
    document.getElementById('dispWomenNames').style.display = 'block';

    for(var i=0;i<N;i++){
        const div = document.getElementById("dispMenNamesForm");
        div.innerHTML += `<p>${dict[i]}</p>
                         <button onclick="selectMenPreference(${i})" value="${i}" id="myBtn${i}">Add Men Preference<button/>`
    }

    for(var i=0;i<N;i++){
        const div = document.getElementById("dispWomenNamesForm");
        div.innerHTML += `<p>${dict[i+N]}</p>
                         <button onclick="selectWomenPreference(${i+N})" value="${i+N}" id="myBtn${i+N}">Add Men Preference<button/>`
    }

    let opt = document.getElementById('addMenPrefer');
    for(var i=N;i<2*N;i++){
        opt.innerHTML += `<button class="preferBtn" ondblclick="makePrefer(this)" onclick="removePrefer(this)" value="${i}" style="background-color:yellow;">${dict[i]}</button>`
    }  

    let opt1 = document.getElementById('addWomenPrefer');
    for(var i=0;i<N;i++){
        opt1.innerHTML += `<button class="preferBtn" ondblclick="makePrefer(this)" onclick="removePrefer(this)" value="${i}" style="background-color:yellow;">${dict[i]}</button>`
    } 
}

function makePrefer(input){
    val = input.value;
    input.style.backgroundColor = "red";
    console.log(val);
    prefer[valuePerson].push(val);
    console.log(prefer);
}

var prefer = [];
for(var i=0;i<N;i++){
    prefer.push([]);
}

function removePrefer(input){
    input.style.backgroundColor = "yellow";
    val = input.value;
    console.log(prefer);
    const index = prefer[valuePerson].indexOf(val);
    if (index > -1) { // only splice array when item is found
        prefer[valuePerson].splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(prefer);
}

function selectMenPreference(input){
    try{
        const nodes = document.getElementsByClassName('preferBtn');
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].style.backgroundColor = "yellow";
        }   
    }
    catch(e){
        // this can be empty
    }

    document.getElementById('addMenPrefer').style.display = 'block'; 
    document.getElementById('addWomenPrefer').style.display = 'none'; 
    valuePerson = input;
    console.log(valuePerson);
}

function selectWomenPreference(input){
    try{
        const nodes = document.getElementsByClassName('preferBtn');
        for (let i = 0; i < nodes.length; i++) {
            nodes[i].style.backgroundColor = "yellow";
        } 
    }
    catch(e){
        // this can be empty
    }
    document.getElementById('addWomenPrefer').style.display = 'block'; 
    document.getElementById('addMenPrefer').style.display = 'none'; 
    valuePerson = input;
    console.log(valuePerson);
}

// Algorithm starts here
    
function wPrefersM1OverM(N,prefer, w, m, m1){
    for (var i = 0; i < N; i++) {
        if (prefer[w][i] == m1)
            return true;

        if (prefer[w][i] == m)
            return false;
    }
};

function stableMarriage(M,prefer){

    let N = parseInt(M);
    var wPartner = new Array(N);
    mFree = new Array(N);

    wPartner.fill(-1);
    mFree.fill(false);
    var freeCount = N;

    while (freeCount > 0) {
        var m;
        for (m = 0; m < N; m++)
            if (mFree[m] == false)
                break;

        for (var i = 0; i < N && mFree[m] == false; i++) {
            var w = prefer[m][i];

            if (wPartner[w - N] == -1) {
                wPartner[w - N] = m;
                mFree[m] = true;
                freeCount--;
            }
            else
            {
                var m1 = wPartner[w - N];
                if (wPrefersM1OverM(N,prefer, w, m, m1) == false) {
                    wPartner[w - N] = m;
                    mFree[m] = true;
                    mFree[m1] = false;
                }
            }
        }
    }

    console.log("Woman	 Man");
    for (var i = 0; i < N; i++)
        console.log(" " + (i + N) + "	 " + wPartner[i]);

};   

var prefer = new Array(2*N);

// var prefer = [[7, 5, 6, 4],
//              [5, 4, 6, 7],
//              [4, 5, 6, 7],
//              [4, 5, 6, 7],
//              [0, 1, 2, 3],
//              [0, 1, 2, 3],
//              [0, 1, 2, 3],
//              [0, 1, 2, 3],
//              ];