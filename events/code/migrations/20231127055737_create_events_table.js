export const up = async (knex) => {
    await knex.schema.createTable('events', (table) => {
      table.increments('id').primary();
      table.timestamp('datetime');
      table.string('name');
      table.string('location');
      table.string('link');
    });
  };
  
export const down = async (knex) => {
    await knex.schema.dropTable('events');
};
  