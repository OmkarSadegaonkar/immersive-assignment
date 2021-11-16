module.exports = (sequelize, Sequelize) => {
    const Company = sequelize.define("company", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        website: {
            type: Sequelize.STRING
        },
    },
        {
            indexes: [
                {
                    unique: false,
                    fields: ['name']
                }
            ]
        });

    return Company;
};