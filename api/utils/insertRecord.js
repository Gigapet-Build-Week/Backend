module.exports = async (table, newData) => {
   console.log(`Inserting a new record...\n${JSON.stringify(newData, null, 3)}`);
   if (process.env.DB_ENV !== "production") {
      const [id] = await table.add(newData);
      return table.findById(id);
   }

   return table.add(newData);
};