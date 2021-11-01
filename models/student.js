var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var studentSchema = new Schema(
    {
        civicNo : { type : String },
        studentID : { type : String },
        name : { type : String }
});

module.exports = mongoose.model("Student", studentSchema, "student");