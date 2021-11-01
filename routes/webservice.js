const entities = require("entities");
module.exports = function(app, Module){
//var Module = require("../models/module");

// GET-anrop alla aktiva moduler
app.get("/epok/api/modules", function(req, res) {
    console.log('Finding all modules....');
    allModules=[];
    activeModules=[];
    Module.find({}, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }
        for(let index=0; index<result.length; index++){
            console.log(result[index]._doc.aktiv_modul);
            if(result[index]._doc.aktiv_modul==="true"){
                console.log("True!");
                activeModules.push(result[index]._doc); 
            }
        }
        
        //const activeModule = new Module();
        /*
        if(result.activeModules==true){
            activeModule.aktiv_modul = result.activeModule;
            activeModule.kurskod = result.kurskod;
            activeModule.benamning = result.benamning;
            activeModule.kod = result.kod;
            activeModules.push(allModules);
        }*/
        console.dir(activeModules);
        res.status(200).send(activeModules);
        
    });
        
    });

// GET-anrop aktiva moduler
app.get("/epok/api/modules/:courseCode", function(req, res) {
    activeModules=[];
    const courseCode = req.params.courseCode;
    console.log('code', courseCode);
    Module.find({kurskod: courseCode}, function(err, result){
        
        const activeModule = new Module();

        for(let index=0; index<result.length; index++){
            console.dir(result[index]._doc);
            if(result[index]._doc.aktiv_modul==="true"){
                console.log("True!");
                activeModules.push(result[index]._doc); 
            }
        }
/*
        if(result.activeModules==true){
            activeModule.aktiv_modul = result.activeModule;
            activeModule.kurskod = result.kurskod;
            activeModule.benamning = result.benamning;
            activeModule.kod = result.kod;
            activeModules.push(activeModule);
        }*/
        console.dir(activeModules);
        res.status(200).send(activeModules);
        
    });

    });
}
