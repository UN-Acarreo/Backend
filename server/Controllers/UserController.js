const UserModel = require('../Models/User');
async function createUser(req,res)
{
    const{name, lastname, password, address, email}=req.body.request;
    let newUser = await UserModel.create(
        {
            User_name: name,
            User_last_name: lastname,
            User_password: password,
            User_address: address,
            User_Email: email
        }
        ,{
        fields: ['User_name','User_last_name','User_password','User_address','User_Email']
        }
    );
}
module.exports=createUser;