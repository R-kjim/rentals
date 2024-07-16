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

        //post login credentials in a different array
        let newerObj={
            username:e.target.hNumber.value,
            password:e.target.tpassword.value,
            id:e.target.hNumber.value
        }
        fetch("http://localhost:3000/tenantsCredentials",{
            method:"POST",
            body:JSON.stringify(newerObj),
            headers:{
                'Content-Type':"application/json"
            }
        })
    }
    }
    addData()