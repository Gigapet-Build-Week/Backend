const bcrypt = require("bcryptjs");
const Model = require("../Model");

async function addUser (userData) {
   const {password} = userData;

   const newUser = {
      ...userData,
      // is_onboarded: !!userData.is_onboarded
   }

   try {
      const hashedPwd = await bcrypt.hashSync(password, 14);
      newUser.password = hashedPwd;

      console.log(`Inserting a new user...\n${JSON.stringify(newUser, null, 3)}`);
      if (process.env.DB_ENV !== "production") {
         const [id] = await this.add(newUser);
         return this.findById(id);
      }

      return this.add(newUser);
   } catch (error) {
      return Promise.reject(error);
   }
};

const Auth = new Model("users");
Auth.addUser = addUser.bind(Auth);
module.exports = Auth;