const mongoose=require('mongoose');
const {productModel}=require("../modules/product.Module");
const express=require("express");
const productRoute=express.Router();

productRoute.get("/get",async(req,res)=>{
     let objfilters={};let page=0;
     console.log(req.query);
    if(req.query.itemType){
        objfilters.itemType=req.query.itemType;
    }
    if(req.query.brand){
        objfilters.brand=req.query.brand;   
    }
    if(req.query.price_gte&&req.query.price_lte){
      
        req.query.price_gte=req.query.price_gte.map((el)=>(
            Number(el)
        ))
        req.query.price_gte=req.query.price_gte.sort((a,b)=>(a-b));
        req.query.price_lte=req.query.price_lte.map((el)=>(
            Number(el)
        ))
        console.log(req.query.price_gte,req.query.price_lte);
        req.query.price_lte=req.query.price_lte.sort((a,b)=>(a-b));
    objfilters.discountedPrice={$gt:req.query.price_gte[0],$lt:req.query.price_lte[req.query.price_lte.length-1]};
    
    }
    if(req.query.rating_gte){
         objfilters.rating={$gt:Number(req.query.rating_gte[req.query.rating_gte.length-1])};
    }
    if(req.query.discount_gte){
        objfilters.discount={$gt:Number(req.query.discount_gte[req.query.discount_gte.length-1])}; 
    }
    if(req.query.gender){
        objfilters.gender=req.query.gender;
    }
    if(req.query.q!=="null"&&req.query.q){
        objfilters.brand={$in:req.query.q};
    }

     if(req.query._page){
        page=(Number(req.query._page)-1)*16;
    }
    console.log(objfilters,"hi");
    const productslength=await productModel.find();
    const products=await productModel.find(objfilters).skip(page).limit(16);
   // console.log(products);
    res.json({products,"prodlength":productslength.length});
   
});
module.exports={productRoute};
