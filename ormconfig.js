module.exports = {
    type: 'sqlite',
    database: `@src/../database/db.sqlite`,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  };