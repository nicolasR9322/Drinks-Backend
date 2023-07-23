const createError = require("http-errors");
const User = require("../models/User");
const generateTokenRandom = require("../helpers/generateTokenRandom");
const generateJWT = require("../helpers/generateJWT");

const register = async (req,res) => {
    const {name,email,password} = req.body;

    try {
        if([name,email,password].includes("") || !name || !email || !password){
            throw createError(400, "Todos los campos son obligatorios")
        }

        let user = await User.findOne({
            email : email
        });

        if(user){
            throw createError(400 , "El email ya se encuentra registrado")
        };

        user = new User(req.body);
        user.token = generateTokenRandom();
        const userStore = await user.save();

        console.log(userStore);

        // todo : enviar email de confirmacion de registro

        return res.status(201).json({
            ok : true,
            message : "Se enviara un email para confirmar registro"
        })

    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            message : error.message || "ups hubo un error"
        })
    }
}

const login = async (req,res) => {

    try {
        const {email,password} = req.body;

        if([email,password].includes("") || !email || !password){
            throw createError(400, "Todos los campos son obligatorios")
        }

        let user = await User.findOne({
            email : email
        });

        if(!user){
            throw createError(400 , "El usuario no existe")
        };

        if(await user.checkedPassword(password)){
            return res.status(200).json({
                ok: true,
                token : generateJWT({
                    user: {
                        id : user._id,
                        name : user.name,
                    }
                })
            })
        } else {
            throw createError(403, "Credenciales invalidas")
        }
        
    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            message : error.message || "ups hubo un error"
        })
    }

}

module.exports = {
 register,
 login
}