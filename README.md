# immersive-assignment
Thanks for giving me opportunity to showcase my technical skills.
This project is a part of recruitment process for role of Node.js developer in Immersive VR.

Please follow the following steps to get the project working locally - 


**Step 1**: Install Node.js and npm from https://nodejs.org/en/download/.

**Step 2**: Install MySQL Community Server from https://dev.mysql.com/downloads/mysql/ and ensure it is started. Installation instructions are available at https://dev.mysql.com/doc/refman/8.0/en/installing.html. I have used remote mysql database from https://remotemysql.com/ and managed via MySQL Workbench from my local computer.

**Step 3**: Download or clone the project source code from https://github.com/OmkarSadegaonkar/immersive-assignment

**Step 4**: Install all required npm packages by running npm install from the command line in the project root folder (where the package.json is located).

**Step 5**: Start the api by running npm start from the command line in the project root folder. The server will be running on 8080. I have attached my Postman collection that I have used as part of development and developers testing.

**Step 6**: To run the integration tests - you need to stop the server first. Then run the command npm run test.


**Note**: Before running in production also make sure that you update the secret property in the config.json file, it is used to sign and verify JWT tokens for authentication.


**To test the functionality - **

**Step 1**: Create a company with appropriate fields

**Step 2**: Create an employee with the company name from existing company table

**Step 3**: All CRUD operations could be tested on Company and Employee APIs
