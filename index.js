const { query } = require("express");
const express = require("express");
// const empdata=require("./emp.json")
const app = express();

var mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/mongo";

var dbConnected;

mongoose.connect(url, (err, db) => {
  if (err) console.log(err);
  console.log("Connction Established");
});

const empSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  salary: Number,
  department: String,
  lastCompany: String,
  contactInfo: {
    type: Number,
    min: 5,
    max: 10,
  },
  yearGrad: Number,
  gradStream: String,
  batch: String,
});

const Employee = mongoose.model("employees", empSchema);

app.get("/insertOne", function (req, res) {
  var employee1 = new Employee({
    firstName: "John  ",
    lastName: "  Doe  ",
    salary: 25000,
    department: "   HR  ",
    lastCompany: "  X  ",
    lastSalary: 10000,
    overallExp: 2,
    contactInfo: 1234567890,
    yearGrad: 2016,
    gradStream: " CSE  ",
  });

  employee1.save(function (err, result) {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
});

app.get("/insertMany", function (req, res) {
  var employee2 = new Employee({
    firstName: "  Sameera  ",
    lastName: "  Khan ",
    salary: 55000,
    department: "   accounts  ",
    lastCompany: "  Z  ",
    lastSalary: 30000,
    overallExp: 2,
    contactInfo: 129789890,
    yearGrad: 2021,
    gradStream: " CSE  ",
  });
  var employee3 = new Employee({
    firstName: "  Sao  ",
    lastName: "Avika",
    salary: 39000,
    department: "   Sales ",
    lastCompany: "  X  ",
    lastSalary: 20000,
    overallExp: 3,
    contactInfo: 1297238890,
    yearGrad: 2017,
    gradStream: " ECE  ",
  });
  var employee4 = new Employee({
    firstName: "  Vinay  ",
    lastName: "  sethu  ",
    salary: 80000,
    department: "  Developer  ",
    lastCompany: "  Y  ",
    lastSalary: 50000,
    overallExp: 4,
    contactInfo: 1297231780,
    yearGrad: 2016,
    gradStream: " MECH  ",
  });

  var employee5 = new Employee({
    firstName: "  James ",
    lastName: " Bond ",
    salary: 60000,
    department: "   Marketing  ",
    lastCompany: "  Y  ",
    lastSalary: 20000,
    overallExp: 5,
    contactInfo: 125678890,
    yearGrad: 2014,
    gradStream: " CSE  ",
  });

  Employee.insertMany([employee2, employee3, employee4, employee5]);
  console.log("Inserted Multiple Employee Data");
  res.json({ success: 1 });

  employee2.save(function (err, result) {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
  employee3.save(function (err, result) {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
  employee4.save(function (err, result) {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
  employee5.save(function (err, result) {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
});
//displaying all the employee data in json format
app.get("/find", function (req, res) {
  Employee.find(query, (err, result) => {
    console.log(result);
  });
  console.log("All Employee data");
});
app.get("/findsalary", function (req, res) {
  Employee.find({ salary: { $gt: 30000 } }, (err, result) => {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
  console.log("Employee with salary greater than 30000");
});

app.get("/findexp", function (req, res) {
  Employee.find({ overallExp: { $gt: 2 } }, (err, result) => {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
  console.log("Employee with experiance is greater than 2");
});
app.get("/findsalexp", function (req, res) {
  Employee.find(
    { overallExp: { $gt: 2 } },
    { salary: { $gt: 40000 } },
    (err, result) => {
      if (err) console.log(err);
      else {
        res.json(result);
      }
    }
  );
  console.log(
    "Employee with experiance is greater than 2 and salary greater than 40000"
  );
});

//updating whose salary was 39000
app.get("/updateall", function (req, res) {
  Employee.updateOne({ salary: 40000 }, { salary: 60000 }, (err, res) => {
    console.log(res);
  });
});

//deleting whose last company is Y
app.get("/deleteall", function (req, res) {
  Employee.deleteMany({ lastCompany: "Y" }, (err, result) => {
    if (err) console.log(err);
    else {
      res.json(result);
    }
  });
});

app.listen(40045);
