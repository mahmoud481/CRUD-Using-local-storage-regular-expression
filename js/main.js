let name = document.getElementById('name');
let number = document.getElementById('number');
let email = document.getElementById('email');
let desc = document.getElementById('description');
let serch = document.getElementById('search');
let saveBtn = document.getElementById('btn');
let persons ;  // Array Of Objects (JSON)
let row = document.getElementById('person');
let tBody= document.getElementById('tableBody');
let tHead= document.getElementById('tableHead');
let btnToggle = false;
let globalIndex;

saveBtn.addEventListener('click',function(){

    if(btnToggle === false){
        add();
    }else{
        update();
        clearForm();
    }
});

// Name validation 
const nameRegex = /^[A-Z][a-zA-Z]{3,10}$/;
function validateName()
{
    if(  nameRegex.test(name.value) == false)
    {
        name.classList.add("is-invalid");
        name.classList.remove("is-valid");

      return false;
    }
    else
    {
        name.classList.add("is-valid");
        name.classList.remove("is-invalid");

      return true;

    } 
}
name.addEventListener("keyup" , validateName)

// Number Validations
const numberRegex = /^01[0125][0-9]{8}$/;
function validateNumber()
{
    if(  numberRegex.test(number.value) == false)
    {
        number.classList.add("is-invalid");
        number.classList.remove("is-valid");

      return false;
    }
    else
    {
        number.classList.add("is-valid");
        number.classList.remove("is-invalid");

      return true;

    } 
}
number.addEventListener("keyup" , validateNumber)


if(localStorage.getItem('personsList') == null){  // Means First Time 
    persons=[] ;
}else{
    persons = JSON.parse(localStorage.getItem('personsList'));
    show();

}


// Adding Person Details to my list

function add(){
    if( validateName() == true &&  validateNumber() == true){
        let person = {
            name : name.value,
            phoneNumber : number.value ,
            email : email.value,
            description : desc.value
        }
        persons.push(person);
        localStorage.setItem('personsList' , JSON.stringify(persons));
        show();
        clearForm();
    }else{
        alert('Please Enter Correct Data');
    }
}

// Show Person Details

function show(){
    let col = '';
    tHead.innerHTML = ' <th>Name</th> <th>Number</th> <th>Email</th> <th>Description</th> <th>Action</th>'
    for(let i = 0 ; i < persons.length ; i++){
            col +=`<tr>
                        <td>`+persons[i].name+`</td>
                        <td>`+persons[i].phoneNumber+`</td>
                        <td>`+persons[i].email+`</td>
                        <td>`+persons[i].description+`</td>
                        <td>
                            <button class = 'btn btn-warning m-2' onclick='ret(`+i+`)'> Update </button>
                            <button class = 'btn btn-danger m-2' onclick='delet(`+i+`)'> Delete </button>
                        </td>
                    </tr>`
        }
    tBody.innerHTML = col;
}

// Delete Person From My List

function delet(index){
    persons.splice(index , 1);
    localStorage.setItem('personsList' , JSON.stringify(persons));   // 3shan lma ados delete yems7 men el local storge kman
    show();
}

// Reset The Form 
function clearForm(){
    name.value = '';
    number.value = '';
    email.value = '';
    desc.value = '';
}

// Retrieve Person Information

function ret(index){
    btnToggle = true;
    name.value = persons[index].name;
    number.value = persons[index].phoneNumber;
    email.value = persons[index].email;
    desc.value = persons[index].description;
    globalIndex=index;
    saveBtn.innerHTML='Update';
}

// Update Person Information

function update(){
    persons[globalIndex].name = name.value;
    persons[globalIndex].phoneNumber = number.value;
    persons[globalIndex].email = email.value ;
    persons[globalIndex].description = desc.value;
    localStorage.setItem('personsList' , JSON.stringify(persons)); // 3shan lma a3ml update ysm3 fe el local storage
    show();
    btnToggle = false;
    saveBtn.innerHTML='Save';
}


// Searching  

function searchPerson(term){
    let col =``;
    let col2 = ``;
    for(let i =0 ; i<persons.length ; i++){
        let myName = persons[i].name;
        myName = myName.toLowerCase();
        term = term.toLowerCase();
        if(myName.includes(term.trim()) == true){
            col +=`<tr>
            <td>`+persons[i].name+`</td>
            <td>`+persons[i].phoneNumber+`</td>
            <td>`+persons[i].email+`</td>
            <td>`+persons[i].description+`</td>
            <td>
                <button class = 'btn btn-warning m-2' onclick='ret(`+i+`)'> Update </button>
                <button class = 'btn btn-danger m-2' onclick='delet(`+i+`)'> Delete </button>
            </td>
        </tr>`

        col2 += `<p>`+persons[i].name+`</p>`;
        }
    }
    tBody.innerHTML = col;
    document.getElementById('searchResults').innerHTML=col2;
}