const tableName = 'articles'

const up = async function (knex) {
  await knex.schema.createTable(tableName, function (table) {
    table.increments('id', {primaryKey: true})
    table.string('heading', 255).notNullable().defaultTo('Untitled article')
    table.string('content', 10000).notNullable()
    table.timestamp('created_at', {useTz: false}).defaultTo(knex.fn.now())
    table.timestamp('updated_at', {useTz: false})

  })

  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$;
  `);

  return knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
};

const down = async function (knex) {
  await knex.raw(`
    DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
  `);

  return knex.schema.dropTable(tableName);
};

export {up, down}
