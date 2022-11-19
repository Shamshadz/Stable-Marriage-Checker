let N = 0;
var dict = {};
let valuePerson = -1;
var prefer = [];
// some variables to use

// first fuction to call after entering no of people to match
addNoPeople = (event) => {
    event.preventDefault();

    N = document.getElementById('noPeople').value;

    if(Object.keys(dict).length){
        dict = {}
    }

    prefer = []

    let opt = document.getElementById('addMenPrefer');
    try{
        while (opt.hasChildNodes()) {
            opt.removeChild(opt.firstElementChild);
        }
    }
    catch(e){}

    let opt1 = document.getElementById('addWomenPrefer');
    try{
        while (opt1.hasChildNodes()) {
            opt1.removeChild(opt1.firstElementChild);
        }
    }
    catch(e){}

    document.getElementById("resultDiv").style.display = "none";
    document.getElementById('resultBtn').style.display = "none";
    document.getElementById('dispMenNames').style.display = 'none';
    document.getElementById('dispWomenNames').style.display = 'none';

    const div = document.getElementById("addMenForm");
    try{
        while (div.hasChildNodes()) {
            div.removeChild(div.firstElementChild);
        }
    }
    catch(e){}

    const div1 = document.getElementById("addWomenForm");
    try{
        while (div1.hasChildNodes()) {
            div1.removeChild(div1.firstElementChild);
        }
    }
    catch(e){}

    for(var i=0;i<N;i++){
        const div = document.getElementById("addMenForm");
        console.log(i)
        div.innerHTML += `<input id="addMenName${i}" class="nameInput" type="text" required />`
    }

    for(var i=0;i<N;i++){
        console.log(i)
        const div = document.getElementById("addWomenForm");
        div.innerHTML +=  `<input id="addWomenName${i}" class="nameInput" type="text" required />`
    }

    for(var i=0;i<2*N;i++){
        prefer.push([]);
    }

    document.getElementById('addNames').style.display = "block";

}

// add names of women and men
function addNames(event){
    event.preventDefault();
    N = parseInt(N);
    for(var i=0;i<N;i++){
        let addName = document.getElementById(`addMenName${i}`).value;
        dict[i] = addName;
    }

    for(var i=0;i<N;i++){
        let addName = document.getElementById(`addWomenName${i}`).value;
        dict[i+N] = addName;
    }
    console.log(dict);
    addPrefer(dict);
    document.getElementById('addNames').style.display= "none";
    result = document.getElementById('resultBtn').style.display = "block";
}

// result func
getResult = () => {
    try{
        stableMarriage(N,prefer);
    }
    catch(e){
        console.log(e);
        alert("Choose all preference");
    }
    document.getElementById("resultDiv").style.display = "block";
}

// add preference div and display prefernce btn
function addPrefer(dict){

    const div = document.getElementById("dispMenNamesForm");
    try{
        while (div.hasChildNodes()) {
            div.removeChild(div.firstElementChild);
        }
    }
    catch(e){}
    
    const div1 = document.getElementById("dispWomenNamesForm");
    try{
        while (div1.hasChildNodes()) {
            div1.removeChild(div1.firstElementChild);
        }
    }
    catch(e){}

    document.getElementById('dispMenNames').style.display = 'block';
    document.getElementById('dispWomenNames').style.display = 'block';

    for(var i=0;i<N;i++){
        const div = document.getElementById("dispMenNamesForm");
        div.innerHTML += `<p>${dict[i]}</p>
                         <button onclick="selectMenPreference(${i})" value="${i}" id="myBtn${i}">Add ${dict[i]} Preference<button/>`
    }

    for(var i=0;i<N;i++){
        const div = document.getElementById("dispWomenNamesForm");
        div.innerHTML += `<p>${dict[i+N]}</p>
                         <button onclick="selectWomenPreference(${i+N})" value="${i+N}" id="myBtn${i+N}">Add ${dict[i+N]} Preference<button/>`
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

// make preference choice btn red
function makePrefer(input){
    val = input.value;
    input.style.backgroundColor = "red";
    console.log(val);
    prefer[valuePerson].push(val);
    console.log(prefer);
}

// make preference empty list of nopeople to add laterOn
var prefer = [];
for(var i=0;i<N;i++){
    prefer.push([]);
}

// remove preference
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

// select men preference
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
    preferModal();
    document.getElementById('addWomenPrefer').style.display = 'none'; 
    valuePerson = input;
    console.log(valuePerson);
}

// select women preference
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
    preferModal();
    document.getElementById('addMenPrefer').style.display = 'none'; 
    valuePerson = input;
    console.log(valuePerson);
}

// Get the preference choice modal
function preferModal(){
    var modal = document.getElementById("myModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }
}

var prefer = new Array(2*N);

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
    
    resultTable = document.querySelector(".resultTable")
    try{
        while (resultTable.hasChildNodes()) {
            resultTable.removeChild(resultTable.firstElementChild);
        }
    }
    catch(e){}

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

    resultTable.innerHTML += `<tr>
                                <th>Womens</th>
                                <th>Mens</th>
                            </tr>`
    console.log("Woman	 Man");
    for (var i = 0; i < N; i++)
        resultTable.innerHTML += `<tr>
                                    <td>${dict[i+N]}</td>
                                    <td>${dict[wPartner[i]]}</td>
                                </tr>`

};   