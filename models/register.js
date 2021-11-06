const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema(
    {
        studentID : {
            type: String,
            required: false,
        },
        kurskod : {
            type: String,
        },
        moduler : {
            type: Object
        }
});
var collectionName = "Registrering";
const Registrering = mongoose.model("Registrering", RegisterSchema, collectionName);

module.exports = Registrering;