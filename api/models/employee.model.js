module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: Sequelize.STRING
        },
        lastname: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        company: {
            type: Sequelize.STRING,
            references: {
                model: 'companies',
                key: 'name'
            }
        },
    });

    return Employee;
};