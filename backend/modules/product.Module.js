const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    
        "rating": Number,
        "rating_Count": String,
        "image": String,
        "brand": String,
        "description": String,
        "size": String,
        "discountedPrice":Number,
        "originalPrice": Number,
        "discount":Number,
        "newTag": String,
        "itemType":String,
        "id": Number,
        "gender": String,
        "title": String
      
      
});
const productModel=mongoose.model("products",productSchema);
module.exports={productModel};

// {
//     "rating": 4.4,
//     "rating_Count": "600",
//     "image": "https://assets.myntassets.com/dpr_2,q_60,w_210,c_limit,fl_progressive/assets/images/17535032/2022/3/24/aafe16ee-6483-40ef-8fae-80e114279b591648122118227-Puma-Men-Tshirts-4991648122117871-1.jpg",
//     "brand": "Puma",
//     "description": "Men 2022 Fan Jersey",
//     "size": "S",
//     "discountedPrice":766,
//     "originalPrice": 1299,
//     "discount":41,
//     "newTag": "SALE",
//     "itemType": "T-shirt",
//     "id": 1,
//     "gender": "Men",
//     "title": "Puma T-shirt"
//   }