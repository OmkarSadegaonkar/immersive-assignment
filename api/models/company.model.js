const sql = require("./db.js");

// constructor
const Company = function (company) {
    this.name = company.name;
    this.email = company.email;
    this.phone = company.phone;
    this.website = company.website;
};

Company.create = (newCompany, result) => {
    sql.query("INSERT INTO companies SET ?", newCompany, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created company: ", { id: res.insertId, ...newCompany });
        result(null, { id: res.insertId, ...newCompany });
    });
};

Company.findById = (id, result) => {
    sql.query(`SELECT * FROM companies WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found company: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Company with the id
        result({ kind: "not_found" }, null);
    });
};

Company.getAll = (result) => {
    sql.query(`SELECT * FROM companies;`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found companies");
            result(null, res);
            return;
        }

        // not found Company with the id
        result({ kind: "not_found" }, null);
    });
};

Company.updateById = (id, company, result) => {
    sql.query(
        "UPDATE companies SET name = ?, email = ?, phone = ?, website = ? WHERE id = ?",
        [company.name, company.email, company.phone, company.website, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Company with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated company: ", { id: id, ...company });
            result(null, { id: id, ...company });
        }
    );
};

Company.remove = (id, result) => {
    sql.query("DELETE FROM companies WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Company with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted company with id: ", id);
        result(null, res);
    });
};

Company.removeAll = result => {
    sql.query("DELETE FROM companies", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} companies`);
        result(null, res);
    });
};

module.exports = Company;