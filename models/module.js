const mongoose = require("mongoose");

const ModuleSchema = new mongoose.Schema(
    {
        aktiv_modul : {
            type: String,
            required: false,
        },
        kurskod : {
            type: String,
        },
        benamning : {
            type: String,
        },
        kod : {
            type: String,
        }
});
var collectionName = "Modul";
const Module = mongoose.model("Modul", ModuleSchema, collectionName);

module.exports = Module;