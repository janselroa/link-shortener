const {model, Schema} = require("mongoose")
const LinkSchema = new Schema({
    originalurl: {type: String, required: true, trim: true},
    newurl: {type: String, required: true, trim: true}
})
module.exports = model("Link",LinkSchema)
