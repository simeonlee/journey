
ARCHITECTURAL OVERVIEW

SERVER

  DATABASE
  Uses a relational database with mySql.
  The database utilizes X tables:
  Users
    - Stores usernames and encrypted passwords of all users
  TODO: etc.

  SEQUELIZE
    - ORM used to interact with mySql database through javascript.

  ROUTING
    - 3 endpoints set up on server to handle RESTful requests.
    - /api/journal, GET, POST, PUT

ARCHITECTURAL OVERVIEW

CLIENT

Dependencies:

  From package.json:
  TODO: etc.

  More dependencies imported by webpack:
  JQuery
  Bootstrap
  moment, moment-range
  D3, D3-range
  axios