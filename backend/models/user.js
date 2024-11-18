const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/login');
const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,unique:true},
    location:{type:String,required:true},
    pincode:{type:Number,required:true,unique:true}

});
const User=mongoose.model('Users',userSchema);
module.exports=User