const db = require("../models");
const validateRequest = require('../middleware/validate-request');
const Joi = require('joi');
const Employee = db.employees;

const validateEmployeeSchema = (req, res, next) => {
  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string(),
    company: Joi.string()
  });
  validateRequest(req, next, schema);
}
// Create and Save a new Employee
const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Please provide Employee data"
    });
  }
  Employee.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Unexpected error occurred while creating the Employee. Please refer the logs"
      });
    });
};

// Retrieve all Employees from the database.
const findAll = (req, res) => {
  Employee.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Unexpected error occurred while retrieving Employees. Please refer the logs"
      });
    });
};

// Find a single Employee with a id
const findOne = (req, res) => {
  const id = req.params.id;

  Employee.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Employee with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Employee with id=" + id
      });
    });
};

// Update a Employee identified by the id in the request
const update = (req, res) => {
  const id = req.params.id;

  Employee.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      res.send({
        message: "Employee was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Employee with id=" + id
      });
    });
};

// Delete a Employee with the specified id in the request
const deleteOne = (req, res) => {
  const id = req.params.id;

  Employee.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Employee was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Employee with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Employee with id=" + id
      });
    });
};

// Delete all Employees from the database.
const deleteAll = (req, res) => {
  Employee.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Employees were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Unexpected error occurred while removing all Employees. Please refer the logs"
      });
    });
};

module.exports = {
  create,
  deleteAll,
  deleteOne,
  update,
  findOne,
  findAll,
  validateEmployeeSchema
}