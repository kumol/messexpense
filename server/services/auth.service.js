const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports ={
    authenticated: async()=>{
        return true;
    },
    isAdmin: async()=>{
        return true;
    },
    isManager: async()=>{
        return true;
    },
    isCreator: async()=>{
        return true;
    },
    hashPassword: (password)=>{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    },
    passwordCompare:(password, hash)=>{
        return bcrypt.compareSync(password, hash); ;
    },

    setToken: (data)=>{
        return jwt.sign({
            data: data
          }, process.env.SECRET, { expiresIn: '1h' });
    }
}