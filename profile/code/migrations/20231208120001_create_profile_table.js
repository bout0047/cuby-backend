export const up = async (knex) => {
  await knex.schema.createTable('profile', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.specificType('goals', 'text[]'); //maybe use string[] instead of text[]
    table.specificType('stats', 'text[]');
    table.specificType('interests', 'text[]');
  });
};

export const down = async (knex) => {
  await knex.schema.dropTable('profile');
};
