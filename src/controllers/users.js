const { Users } = require("../models");

async function createUser(userOpts) {
  if (!userOpts.username) {
    throw new Error("Did not supply username");
  }
  if (!userOpts.email) {
    throw new Error("Did not supply email");
  }
  if (!userOpts.password) {
    throw new Error("Did not supply password");
  }

  const user = await Users.create({
    userOpts,
  });

  if (!user) {
    throw new Error(`Could not create user`);
  }

  return user;
}


module.exports = {
    createUser
}