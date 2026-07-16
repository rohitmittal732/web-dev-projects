const apiLink=" http://universities.hipolabs.com/search?country=United+States";
fetch(apiLink)
.then((res)=>{
    console.log(res);
    return res.json();
})
.then((data)=>
{
    console.log(data);

    document.createElement('input');
    input.id="myinput";
    input.placeholder="enter country"
    input.appendChild('container');
    document.createElement("button");
    button.id="btn";
    const btn=document.getElementById("btn");
    btn.style.backgroundColor="red";
})
.catch((err)=>{
    console.log(err);
})