// Update with your config settings.
const dbConfig = {

}

module.exports = {
   development: {
      client: "sqlite3",
      useNullAsDefault: true,
      connection: {
         filename: './data/test.db3'
      },
      migrations: {
         directory: "./data/migrations",
      },
      seeds: {
         directory: "./data/seeds",
      }
   },

   production: {
      client: "sqlite3",
      useNullAsDefault: true,
      connection: {
         filename: './data/gigapet.db3'
      },
      migrations: {
         directory: "./data/migrations",
      },
      seeds: {
         directory: "./data/seeds",
      }
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
