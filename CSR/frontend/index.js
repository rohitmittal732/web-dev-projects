const apiLink='http://localhost:4000/';

fetch(apiLink)
    .then((res)=>{
        console.log(res);
        return res.json();
    })
    .then((data)=>{
        console.log(data.todos);
         const box = document.querySelector('.box');
box.style.display = "flex";
box.style.flexDirection = "column";   
box.style.alignItems = "center";      

for (let item of data.todos) {
    const row = document.createElement('div');
    row.style.display = "flex";
    row.style.justifyContent = "space-between";
    row.style.alignItems = "center";
    row.style.width = "300px";  
    row.style.margin = "5px 0";

    const para = document.createElement('p');
    para.innerText = item;

    const dlt = document.createElement('button');
    dlt.innerText = "Delete";

    row.appendChild(para);
    row.appendChild(dlt);
    box.appendChild(row);
}

        }
    ).catch(err => console.error("Error:", err));
const btn=document.querySelector('.btn');

function add(e){
    e.preventDefault();
    const input=document.querySelector('.input').value;
    fetch(apiLink,{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:
             JSON.stringify({
                task:input
             })
        
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        const row = document.createElement('div');
        row.style.display = "flex";
        row.style.justifyContent = "space-between";
        row.style.alignItems = "center";
        row.style.width = "300px";
        row.style.margin = "5px 0";

        const para = document.createElement("p");
        para.innerText = input;

        const dlt = document.createElement("button");
        dlt.innerText = "Delete";

        row.appendChild(para);
        row.appendChild(dlt);

        document.querySelector(".box").appendChild(row);

        
        document.querySelector(".input").value = "";
    })
    .catch((err)=>{
        console.log(err);
    })

    
}
// function Delete(e){
//   e.preventDefault();
//   fetch(apiLink,{
//     method:"DELETE",
//     headers:{
//         "Content-type":"application/json"
//     },
//     body: json.stringify({
        
//     })

//   })
// }

btn.addEventListener('click',add);
// dlt.addEventListener('click',delete)