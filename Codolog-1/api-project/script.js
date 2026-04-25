const API = "https://jsonplaceholder.typicode.com";

// 1 Fetch & Console
function fetchConsole(){
    fetch(`${API}/posts`)
    .then(res => res.json())
    .then(data => console.log(data));
}


// 2 Show User List
function showUsers(){
    fetch(`${API}/users`)
    .then(res => res.json())
    .then(users => {
        let list = document.getElementById("userList");
        list.innerHTML="";
        users.forEach(user=>{
            list.innerHTML += `<li>${user.name}</li>`;
        });
    });
}


// 3 Async Await
async function fetchAsync(){
    let res = await fetch(`${API}/posts`);
    let data = await res.json();
    console.log(data);
}


// 4 Try Catch
async function errorHandling(){
    try{
        let res = await fetch(`${API}/posts`);
        let data = await res.json();
        console.log(data);
    }catch(err){
        console.log("Error:",err);
    }
}


// 5 Table
function showTable(){
    fetch(`${API}/users`)
    .then(res=>res.json())
    .then(data=>{
        let table = document.getElementById("table");
        table.innerHTML="";
        data.forEach(user=>{
            table.innerHTML+=`
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
            </tr>`;
        });
    });
}


// 6 First 5
function firstFive(){
    fetch(`${API}/posts`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data.slice(0,5));
    });
}

// 7 Search
let allUsers=[];
fetch(`${API}/users`)
.then(res=>res.json())
.then(data=>allUsers=data);

function searchUser(){
    let value=document.getElementById("search").value.toLowerCase();
    let list=document.getElementById("userList");
    list.innerHTML="";

    let filtered=allUsers.filter(user=>
        user.name.toLowerCase().includes(value)
    );

    filtered.forEach(user=>{
        list.innerHTML+=`<li>${user.name}</li>`;
    });
}

// 8 POST
function postData(){
    fetch(`${API}/posts`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            title:"New",
            body:"Hello",
            userId:1
        })
    })
    .then(res=>res.json())
    .then(data=>console.log(data));
}

// 9 PUT
function putData(){
    fetch(`${API}/posts/1`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            id:1,
            title:"Updated",
            body:"Updated body",
            userId:1
        })
    })
    .then(res=>res.json())
    .then(data=>console.log(data));
}

// 10 DELETE
function deleteData(){
    fetch(`${API}/posts/1`,{method:"DELETE"})
    .then(()=>console.log("Deleted"));
}

// 11 Loader
function loadWithLoader(){
    document.getElementById("loading").innerText="Loading...";
    fetch(`${API}/posts`)
    .then(res=>res.json())
    .then(data=>{
        document.getElementById("loading").innerText="Loaded";
        console.log(data);
    });
}

// 12 Button Already Done

// 13 JSON Convert
function convertJSON(){
    fetch(`${API}/users`)
    .then(res=>res.json())
    .then(data=>{
        data.forEach(user=>{
            console.log(user.email);
        });
    });
}

// 14 Images
function showImages(){
    fetch(`${API}/photos?_limit=5`)
    .then(res=>res.json())
    .then(data=>{
        let div=document.getElementById("images");
        div.innerHTML="";
        data.forEach(photo=>{
            div.innerHTML+=`<img src="${photo.thumbnailUrl}" />`;
        });
    });
}

// 15 Two APIs
async function callTwoAPI(){
    let users=await fetch(`${API}/users`).then(res=>res.json());
    let posts=await fetch(`${API}/posts`).then(res=>res.json());

    console.log("Users:",users);
    console.log("Posts:",posts);
}