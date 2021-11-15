const { companies } = require("../models");
const db = require("../models");
const Company = db.companies;

// Create and Save a new Company
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Company.create(req.body)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Company."
      });
    });
};

// Retrieve all Companies from the database (with condition).
exports.findAll = (req, res) => {
    Company.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving companies."
      });
    });
};

// Find a single Company with a id
exports.findOne = (req, res) => {
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
exports.update = (req, res) => {
    const id = req.params.id;

    Company.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Company was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Company with id=${id}. Maybe Company was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Company with id=" + id
        });
      });
};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
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
          message: `Cannot delete Company with id=${id}. Maybe Company was not found!`
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
exports.deleteAll = (req, res) => {
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