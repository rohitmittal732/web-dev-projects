const apiLink="https://dummyjson.com/products";
fetch(apiLink)
.then((res)=>{
    console.log(res);
    return res.json();
})
.then((data)=>{
    console.log(data);
})
.catch((err)=>{
    console.log(err);
})

