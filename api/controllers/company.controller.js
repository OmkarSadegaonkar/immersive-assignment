const Company = require("../models/company.model");

// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Company
  const company = new Company({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    website: req.body.website,
  });

  // Save Tutorial in the database
  Company.create(company, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    else res.send(data);
  });
};

// Retrieve all Companies from the database (with condition).
exports.findAll = (req, res) => {
    Company.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving companies."
        });
      else res.send(data);
    });
};

// Find a single Company with a id
exports.findOne = (req, res) => {
    Company.findById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Company with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Company with id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Update a Company identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  
  Company.updateById(
    req.params.id,
    new Company(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Company with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Company with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
    Company.remove(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Company with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Could not delete Company with id " + req.params.id
            });
          }
        } else res.send({ message: `Company was deleted successfully!` });
      });
};

// Delete all Companies from the database.
exports.deleteAll = (req, res) => {
    Company.removeAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all companies."
          });
        else res.send({ message: `All Companies were deleted successfully!` });
      });
};