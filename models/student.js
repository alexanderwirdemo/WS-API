var mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
    {
        civicNo : { 
            type : String,
            required: false, 
        },
        studentID : { 
            type : String 
        },
        name : { 
            type : String 
        }
});
var collectionName = "Student";
const Student = mongoose.model("Student", StudentSchema, collectionName);

module.exports = Student;