// Update with your config settings.
const dbConfig = {
   client: "sqlite3",
   useNullAsDefault: true,
   migrations: {
      directory: "./data/migrations",
   },
   seeds: {
      directory: "./data/seeds",
   },
}

module.exports = {
   development: {
      ...dbConfig,
      connection: {
         filename: './data/test.db3'
      },
   },

   production: {
      ...dbConfig,
      connection: {
         filename: './data/gigapet.db3'
      },
   }
   
   // staging: {
   //    client: 'postgresql',
   //    connection: {
   //       database: 'my_db',
   //       user: 'username',
   //       password: 'password'
   //    },
   //    pool: {
   //       min: 2,
   //       max: 10
   //    },
   //    migrations: {
   //       tableName: 'knex_migrations'
   //    }
   // },

   // production: {
   //    client: 'postgresql',
   //    connection: {
   //       database: 'my_db',
   //       user: 'username',
   //       password: 'password'
   //    },
   //    pool: {
   //       min: 2,
   //       max: 10
   //    },
   //    migrations: {
   //       tableName: 'knex_migrations'
   //    }
   // }

};
