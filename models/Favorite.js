const moongose = require("mongoose");

const favortieSchema = new moongose.Schema({
    drink : {
        type: String,
        required : true,
        trim : true,
    },
    user : {
        type: moongose.Schema.Types.ObjectId,
        ref : "User",
    },
    
    
},
{
    timestamps : true
})

module.exports = moongose.model("Favorite", favortieSchema);