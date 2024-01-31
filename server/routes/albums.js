const router =require("express").Router();


const album =require("../models/album")

router.post("/save",async (req,res)=>{
    const newalbum=album(
        {
           name: req.body.name ,
           imageURL: req.body.imageURL ,
        }
    );

    try{
       const savedalbum= await newalbum.save();
       return res.status(200).send({success :true, album : savedalbum});
    }
    catch(error){
       return res.status(400).send({success:false, msg:error});
    }
});

router.get("/getOne/:id", async(req,res)=>{
    const filter={ _id:req.params.id};
 
    const data= await album.findOne(filter);
    if(data){
       return res.status(200).send({success :true, album : data});
    }
    else{
       return res.status(400).send({success:false, msg:"Data not Found"});
    }
 });

 // isme thodi problem hai
router.get("/getAll", async (req,res)=> {
  
    const data = await album.find();
    if(data){
     return res.status(200).send({success :true, album : data});
    }
    else{
     return res.status(400).send({success:false, msg:"Data not Found"});
    }
  
  });

  router.put("/update/:id" ,async(req,res)=>{
    const filter = {_id : req.params.id};
 
     const options = {
         upsert : true,
         new : true
     };
   try{
      const result=await album.findOneAndUpdate(
       filter,
       {
       name: req.body.name ,
       imageURL: req.body.imageURL ,
       },
       options
    );
    return res.status(200).send({success :true, data: result});
   }
   catch(error){
    return res.status(400).send({success:false, msg:error});
   }
 });

 router.delete("/delete/:id" , async (req,res)=>{
    const filter={ _id:req.params.id};
    const result =await album.deleteOne(filter);
    if(result){
       return res.status(200).send({success :true, msg : "Data Deleted Successfully"});
      }
      else{
       return res.status(400).send({success:false, msg:"Data not Found"});
      }
 
 });


module.exports=router;