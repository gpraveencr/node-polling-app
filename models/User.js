/**
 * Created by PraveenGangasani on 10/24/15.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    fullname : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    //polls : {type : Array, required : false}
    polls : {
            name : {type : String, required : true},
            options : {type : Array, required : false}
           }
});

module.exports = mongoose.model('User', UserSchema);

/*
 {
 "_id" : ObjectId("562c25b3317f25ffa2a5c542"),
 "fullname" : "Praveen Gangasani",
 "email" : "pg@mit.edu",
 "password" : "test",
 "polls" : [
 {
 "name" : "Do you think a new habit can be created within a person ?",
 "options" : [
 "Yes",
 "No"
 ]
 },
 {
 "name" : "How often will you have breakfast ?",
 "options" : [
 "Every Day",
 "Five Days a week",
 "Four Days a week",
 "Three Days a week"
 ]
 }
 ]
 }
 */