export const up = async (knex) => {
    await knex.schema.createTable('templates', (table) => {
      table.increments('id').primary();
      table.string('name');
    });
  };
  
export const down = async (knex) => {
    await knex.schema.dropTable('events');
};
  