
  const newCompany = {
    "name": "Immersive VR",
    "email": "hr@immersive.com",
    "phone": "123456",
    "website": "immersive.com"
  };

  const newEmployee = {
    "firstname": "Joe",
    "lastname": "Smith",
    "email": "joesmith@immersive.com",
    "phone": "123456",
    "company": "Immersive VR"
  };

  const updatedEmployee = {
    "firstname": "Joe updated",
    "lastname": "Smith",
    "email": "joesmith@immersive.com",
    "phone": "123456",
    "company": "Immersive VR"
  }

  
  const updatedCompany = {
    "name": "Immersive VR",
    "email": "hr@immersive.com updated",
    "phone": "123456",
    "website": "immersive.com"
  }

  const newUser = {
    "firstname": "Joe",
    "lastname": "Smith",
    "username": "joe",
    "password": "joe-password"
};

const newUserAdmin = {
    "firstname": "Lara",
    "lastname": "Datta",
    "username": "Lara",
    "password": "lara-password",
    "role": "admin"
};

const newUserBad = {
    "firstname": "Joe 1",
    "lastname": "Smith",
    "username": "joe",
    "password": "joe"
}


module.exports = {
    newCompany,
    newEmployee,
    newUser,
    newUserAdmin,
    newUserBad,
    updatedCompany,
    updatedEmployee
}
