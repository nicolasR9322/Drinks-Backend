const createError = require("http-errors")
const Favorite = require("../models/Favorite")
const User = require("../models/User")

const profile = async (req,res) => {
    return res.status(200).json({
        ok : true,
        user : req.user
    })
}

const toogleFavorite = async(req,res) => {
    try {
        if(!req.user){
            throw createError(403, "Credenciales invalidas")
        }

        const user = await User.findById(req.user.id).populate("favorites" , "drink");

        const {drink} = req.query;

        if(!drink) {
            throw createError(400, "se requiere el ID de la bebida");
        }

        if(!user.favorites.map(favorite => favorite.drink).includes(drink)){
            const favoriteStore = await Favorite.create({
                drink,
                user
            })

            user.favorites.push(favoriteStore._id);
            await user.save();
        } else {
            const favorite = await Favorite.findOne({
                drink,
                user : user._id
            });

            favorite.deleteOne();
            const favoritesUpdated = user.favorites.filter(favorite => favorite.drink !== drink);
            user.favorites = favoritesUpdated;
            await user.save();
        }

        return res.status(200).json({
            data : user.favorites
        })

    } catch (error) {
        return res.status(error.status || 500).json({
            ok : false,
            message : error.message || "ups hubo un error"
        })
    }
} 

module.exports = {
    profile,
    toogleFavorite
}