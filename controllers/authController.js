const createError = require("http-errors");
const User = require("../models/User");

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
        user.token = "asdasdsa";
        const useStore = await user.save()

        // todo : enviar email de confirmacion de registro

        return res.status(201).json({
            ok : true,
            message : "Usuario registrado con exito"
        })

    } catch (error) {
        throw res.status(error.status || 500).json({
            ok : false,
            message : error.message || "ups hubo un error"
        })
    }
}

module.exports = {
 register
}