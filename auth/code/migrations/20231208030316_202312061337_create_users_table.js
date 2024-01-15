export const up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').unique();
    table.string('password');
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('users');
};
