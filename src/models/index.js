"use strict";

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "realworlddb",
  "realworlduser",
  "realworldpass",
  {
    host: "localhost",
    dialect: "mysql",
    logging: true,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  }
);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/**
 * Check if DB connection established
 */
sequelize
  .authenticate()
  .then(() => {
    console.log("DB Connection successfull");
  })
  .catch((err) => {
    console.log(`Error while connecting to DB: ${err}`);
  });


  /**
   * Define schemas
   */

const Users = sequelize.define("user", {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
    allowNull: false,
  },
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  bio: Sequelize.STRING,
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Articles = sequelize.define("article", {
  slug: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(100),
  },
  body: Sequelize.STRING,
});

const Comments = sequelize.define("comment", {
  body: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Tags = sequelize.define("tag", {
  name: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
});


/**
 * Define relationship b/w tables
 */

Comments.belongsTo(Articles);
Articles.hasMany(Comments);

Comments.belongsTo(Users, { as: "author" });

Articles.belongsTo(Users, { as: "author" });

Articles.belongsToMany(Users, { through: "favourites" });
Users.belongsToMany(Articles, { through: "favourites" });

Articles.belongsToMany(Tags, { through: "article_tags" });
Tags.belongsToMany(Articles, { through: "article_tags" });


module.exports = {
  db,
  Users,
  Articles,
  Comments,
  Tags,
};
