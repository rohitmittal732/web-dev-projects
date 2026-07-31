function isAdmin(req,res,next){
   if(req.session.isLoggedIn &&
    req.session.role==="admin"
   ){
    return next();
   }
   res.send("Access Denied")
}
module.exports=isAdmin;