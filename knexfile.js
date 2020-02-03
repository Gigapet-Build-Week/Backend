module.exports = {
   development: {
      client: "sqlite3",
      useNullAsDefault: true,
      connection: {
         filename: './data/gigapet.db3'
      },
      migrations: {
         directory: "./data/migrations"
      },
      seeds: {
         directory: "./data/seeds"
      }
   },

   testing: {
      client: "sqlite3",
      useNullAsDefault: true,
      connection: {
         filename: './data/test.db3'
      },
      migrations: {
         directory: "./data/migrations"
      },
      seeds: {
         directory: "./data/seeds"
      }
   },

   production: {
      client: "pg",
      connection: process.env.DATABASE_URL,
      pool: {
         min: 2,
         max: 10
      },
      migrations: {
         directory: "./data/migrations"
      },
      seeds: {
         directory: "./data/seeds"
      }
   }
};
