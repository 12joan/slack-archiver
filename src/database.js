const base = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
}

export default {
  development: {
    ...base,
  },
  test: {
    ...base,
  },
  production: {
    ...base,
  },
}
