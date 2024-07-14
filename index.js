//add data to the database through the POST method
//create a function that takes in an event listener and acts on it by posting data to a database
function addData(){
let details=document.querySelector('.regDetails');
let myName=
details.addEventListener("submit",addFn)
function addFn(e){
    e.preventDefault()
    let newObj={
        name: e.target.fName.value+" "+e.target.lName.value,
        phoneNumber: e.target.phoneNum.value,
        idNumber: e.target.idNum.value,
        id:e.target.hNumber.value
    }
    fetch("http://localhost:3000/houseNumber",{
        method: "POST",
        body: JSON.stringify(newObj),
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res=>res.json())
    .then(newObj=>console.log(newObj))
}
}
addData()
//list all tenants by accessing the database
function displayFn(){
let myDiv=document.querySelector('.myTenants')
fetch("http://localhost:3000/houseNumber")
.then(res=>res.json())
.then(data=>newFn(data))
function newFn(item){
for(i=0;i<item.length;i++){
    const newDiv=document.createElement("div")
    newDiv.innerHTML=`
    <p>House Number: ${item[i].id}
    <br>Name: ${item[i].name}<br>
    <button>View</button>
    </p>
    `
    myDiv.append(newDiv)}

    //add an event listener to the button created in newDiv
    let myBtn=document.querySelector("button")
    myBtn.style.marginTop="5px"
    myBtn.addEventListener("click",btnFn)
    function btnFn(){
        for(let i=0;i<item.length;i++){
        let infoDiv=document.createElement("div")
        infoDiv.innerHTML=`
        <p>Full Names: ${item[i].name}
        <br>ID Number: ${item[i].idNumber}
        <br>
        </p>
        `
        myDiv.append(infoDiv)
        myDiv.style.display="inline-flex"
        infoDiv.style.marginLeft="15px"
        myBtn.remove()
    }}
    
}}
displayFn()

