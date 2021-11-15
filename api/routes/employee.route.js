
module.exports = app => {
    const employees = require("../controllers/exployee.controller");
  
    const router = require("express").Router();
  
    // Create a new Company
    router.post("/", employees.create);
  
    // Retrieve all Employees
    router.get("/", employees.findAll);
  
    // Retrieve a single Employee with id
    router.get("/:id", employees.findOne);
  
    // Update a Employee with id
    router.put("/:id", employees.update);
  
    // Delete a Employee with id
    router.delete("/:id", employees.deleteOne);
  
    // Delete all Employees
    router.delete("/", employees.deleteAll);
  
    app.use('/api/employees', router);
  };