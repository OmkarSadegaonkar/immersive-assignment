
module.exports = app => {
    const companies = require("../controllers/company.controller");
  
    const router = require("express").Router();
  
    // Create a new Company
    router.post("/", companies.validateCompanySchema, companies.create);
  
    // Retrieve all Companies
    router.get("/", companies.findAll);
  
    // Retrieve a single Company with id
    router.get("/:id", companies.findOne);
  
    // Update a Company with id
    router.put("/:id", companies.validateCompanySchema, companies.update);
  
    // Delete a Company with id
    router.delete("/:id", companies.deleteOne);
  
    // Delete all Companies
    router.delete("/", companies.deleteAll);
  
    app.use('/api/companies', router);
  };