const { companies } = require("../models");
const db = require("../models");
const validateRequest = require('../middleware/validate-request');
const Joi = require("joi");
const Company = db.companies;

const validateCompanySchema = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.string(),
    website: Joi.string()
  });
  validateRequest(req, next, schema);
}
// Create and Save a new Company
const create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Please provide company details"
    });
  }
  Company.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Unexpected error occurred while creating the Company. Please refer the logs."
      });
    });
};

// Retrieve all Companies from the database (with condition).
const findAll = (req, res) => {
  Company.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Unexpected error occurred while retrieving companies. Please refer the logs."
      });
    });
};

// Find a single Company with a id
const findOne = (req, res) => {
  const id = req.params.id;

  Company.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Company with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Company with id=" + id
      });
    });
};

// Update a Company identified by the id in the request
const update = (req, res) => {
  const id = req.params.id;

  Company.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      res.status(200).send({
        message: "Company was updated successfully."
      });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Company with id=" + id
      });
    });
};

// Delete a Company with the specified id in the request
const deleteOne = (req, res) => {
  const id = req.params.id;

  Company.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Company was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Company with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Company with id=" + id
      });
    });
};

// Delete all Companies from the database.
const deleteAll = (req, res) => {
  Company.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Companies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all companies."
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
  validateCompanySchema
}