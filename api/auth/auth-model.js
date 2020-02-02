const bcrypt = require("bcryptjs");
const db = require("../../data/knexDb");
const users_db = db.bind(db, "users");

const add = async userData => {
   const {password} = userData;
   const NOW = new Date().toISOString();
   console.log(`Today is:\n${Date(NOW)}`);

   const newUser = {
      ...userData,
      is_onboarded: !!userData.is_onboarded,
      created_at: NOW,
      last_login: NOW
   }

   try {
      const hashedPwd = await bcrypt.hashSync(password, 14);
      newUser.password = hashedPwd;

      console.log(`Inserting a new user...\n${JSON.stringify(newUser, null, 3)}`);
      const [id] = await users_db().insert(newUser);
      return findById(id);
   } catch (error) {
      return Promise.reject(error);
   }
};

const findBy = filter => {
   return users_db()
      .where(filter);
};

const findById = id => {
   return findBy({id})
      .first();
}

module.exports = {
   add,
   findBy,
   findById
};