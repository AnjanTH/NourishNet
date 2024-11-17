const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/login');
const userSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true,unique:true}
});
const User=mongoose.model('User',userSchema);
module.exports=User