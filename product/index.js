const express=require("express");
const app=express();
const Products=require('./models/product')
const methodOverride=require('method-override');
const mongoose =require('mongoose');

mongoose.connect('mongodb://localhost:27017/vgu')
.then(()=>{
    console.log("db is connected");
})
.catch((err)=>{
    console.log('db is not connected'+ " " +err)
})



// Products.insertMany([
//     {
//         id:1,
//         name:'Phone',
//         image:"https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         price:100,
//         desc:" a portable, handheld device that connects to wireless networks via radio waves to facilitate voice calls, text messaging, and internet access"
//     },
//     {
//         id:2,
//         name:'laptop',
//         image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         price:150,
//         desc:" a portable, handheld device that connects to wireless networks via radio waves to facilitate voice calls, text messaging, and internet access"
//     },
//     {
//         id:3,
//         name:'Drone',
//         image:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         price:70,
//         desc:" a portable, handheld device that connects to wireless networks via radio waves to facilitate voice calls, text messaging, and internet access"
//     },
//     {
//         id:4,
//         name:'keyboard',
//         image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1165&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         price:30,
//         desc:" a portable, handheld device that connects to wireless networks via radio waves to facilitate voice calls, text messaging, and internet access"
//     },
    
// ]).then(()=>{console.log("document is created")});

// Products.updateMany({},{$unset:{id:""}})
// .then(()=>{
//     return Products.find()
// .then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// })
// })
 


app.set("view engine",'ejs');

app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'));

app.get("/",async(req,res)=>{
    const products=await Products.find();
    res.render("home",{products});
})
app.get("/product",(req,res)=>{
    res.render("form")
})
app.post("/product",async(req,res)=>{
        console.log("POST route hit");
    //   let id;
    //   if(products.length>0){
    //     id=products[products.length-1].id+1
    //   }else{
    //     id=1;
    //   }
     const {name,image,price,desc}=req.body;

    //  products.push({id,name,image,price,desc});
    try{
        await Products.create({name,image,price,desc});
        console.log("inserted")

        const data= await Products.find();
        console.log(data);
    }
    catch(err){
        console.log(err);
    }
    
    //  console.log(products);

     res.redirect('/');

})
app.get("/product/show/:id",async(req,res)=>{
    //    const id=req.params.id;
    //    const real=products.find((items)=>items.id==id)
    try{
       const real=await Products.findById(req.params.id);
       res.render("show",{
        product:real
       })
    }
    catch(err){
        console.log("error",err);
    }
})
app.get("/product/edit/:id",async(req,res)=>{
    const id=req.params.id;
    // const product=products.find((items)=>items.id==id)
    try{
        const product=await Products.findById(req.params.id);
    res.render("edit",{product:product})
    }
    catch(err){
        console.log(err);
    }
})

app.put("/product/edit/:id",async(req,res)=>{
    const id=req.params.id;
//    const product=products.find((item)=>{
//      return item.id==id;
//    })
    try{
        const{name,image,desc,price}=req.body;
        const product=await Products.findByIdAndUpdate(id,{name:name,image:image,desc:desc,price});
    }catch(err){
        console.log(err);
    }
//    const{name,image,desc,price}=req.body;
//    product.name=name;
//    product.desc=desc;
//    product.image=image;
//    product.price=price;

   res.redirect('/');
})

app.delete("/product/delete/:id",async(req,res)=>{
    const id=req.params.id;
    // const product=products.find((items)=>items.id==id);
    // const idx=products.indexOf(product);
    // products.splice(idx,1);
    try{
       await Products.findByIdAndDelete(id);
    }
    catch(err){
        console.log("error",err);
    }
    res.redirect("/");
})

app.listen(3000,()=>{
    console.log('server running on port 3000');
})