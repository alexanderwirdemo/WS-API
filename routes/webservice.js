const entities = require("entities");
module.exports = function(app, Module, Registrering, Student, Result){
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

// GET-anrop alla studenter
app.get("/studentITS/api/students", function(req, res) {
    console.log('Finding all students....');
    allStudents=[];
    Student.find({}, function(err, result){
        if(err){
            console.log(err);
            res.send(err);
        }
        for(let index=0; index<result.length; index++){
            console.dir(result[index]._doc);
            allStudents.push(result[index]._doc); 
        }
        console.dir(allStudents);
        res.status(200).send(allStudents);    
    });
        
    });

// GET-anrop en students personnummer OK
app.get("/studentITS/api/students/:studentId", function(req, res) {
    //selectedStudent=[];
    const studentId = req.params.studentId;
    var student = '';
    console.log('studentId', studentId);
    Student.find({studentID: studentId}, function(err, result){
        console.dir(result);
        if(result.length===1){
            student = result[result.length-1]._doc;
            console.dir(student);
            //res.status(200).send(student);
            
        }
        res.status(200).send(student);

        //selectedStudent.push(studentCivicNo);

        
        
    });

    });

    /*
    app.get("/ladok/api/students/:courseCode/:module", function(req, res) {

        for(let index=0; index<registeredStudents.length; index++){
            const studentId = registeredStudents[index];
            console.log('studentId: ', studentId);
            
            Student.find({studentID: studentId}, function(err, result){
                console.log('resultat');
                console.log(result.length);
                //console.dir(result);
                if(result.length===1){
                    console.log('nu');
                    student = result[result.length-1]._doc;
                    console.dir(student);  
                    students.push(student); 
                    console.log('students:');
                    console.dir(students); 
                }
            });
            console.log('students:');
            console.dir(students);
        }
    });*/


// GET-anrop studenter registrerade på vald modul OK
app.get("/ladok/api/students/:courseCode/:module", function(req, res) {
    allRegistrations=[];
    registeredStudents=[];
    const courseCode = req.params.courseCode;
    const moduleCode = req.params.module;
    console.log('code', courseCode);
    console.log('module', moduleCode);
    Registrering.find({kurskod: courseCode}, function(err, result){
        
        const activeModule = new Module();

        for(let index=0; index<result.length; index++){
            console.dir(result[index]._doc);
            allRegistrations.push(result[index]._doc);
        }

        for(let index=0; index<allRegistrations.length; index++){
            console.dir(allRegistrations[index]);
            const moduleCodes = Object.keys(allRegistrations[index].moduler);
            console.dir(moduleCodes);
            if(moduleCodes.includes(moduleCode)){
                console.log("Match!");
                registeredStudents.push(allRegistrations[index].studentID)
            }
        }
        console.dir(registeredStudents);
        
        /*
        for(let index=0; index<registeredStudents.length; index++){
            const studentId = registeredStudents[index];
            console.log('studentId: ', studentId);
            
            Student.find({studentID: studentId}, function(err, result){
                console.log('resultat');
                console.log(result.length);
                //console.dir(result);
                if(result.length===1){
                    console.log('nu');
                    student = result[result.length-1]._doc;
                    console.dir(student);  
                    students.push(student); 
                    console.log('students:');
                    console.dir(students); 
                }
            });
            console.log('students:');
            console.dir(students);
        }*/
        /*
        for(let index=0; index<students.length; index++){
            const studentCivicNo = students[index].personnummer;
            console.log('personnummer: ', studentCivicNo);
            
            Result.find({personnummer: studentCivicNo}, function(err, result){
                console.log('kolla:');
                console.dir(result);
                if(result.length===1){
                    console.log('Found match!');
                    studentResult = result[result.length-1]._doc;
                    console.dir(studentResult);  
                    results.push(studentResult);  
                }
            });
        }*/
        
        res.status(200).send(registeredStudents);
        
    });

    });

    // GET-anrop alla resultat OK
    app.get("/ladok/api/results/", function(req, res) {  
        Result.find(function(err, result){
                console.log('kolla:');
                console.dir(result);
                //res.status(200).send(result);
                res.status(200).send(result);
            });
            
        
    });

    // GET-anrop ett resultat OK
    app.get("/ladok/api/results/:personnummer", function(req, res) {

        const civicNo = req.params.personnummer;
        console.log('personnummer: ', civicNo);    
        Result.find({personnummer: civicNo}, function(err, result){
                console.log('kolla:');
                console.dir(result);
                //res.status(200).send(result);
                res.status(200).send(result);
            });
            
        
    });

    

}
