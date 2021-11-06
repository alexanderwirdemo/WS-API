const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
    {
        status : {
            type: String,
        },
        kurskod : {
            type: String,
        },
        betyg_canvas : {
            type: Object,
        },
        betyg_ladok : {
            type: Array,
        },
        personnummer : {
            type: String,
        }        
    });
    var collectionName = "Resultat";
    const Resultat = mongoose.model("Resultat", ResultSchema, collectionName);
    
    module.exports = Resultat;
