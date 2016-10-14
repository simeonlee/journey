|      URL                         | HTTP Verb | Request Body |                             Result                                           |
|:--------------------------------:|:---------:|:------------:|:----------------------------------------------------------------------------:|
| /api/journal                     |    GET    |     JSON     |                                                               Return entries |
| /api/journal                     |    POST   |    empty     |                                                                              |


SIGN UP
1. user goes to home page '/' -> redirects to login
2. user clicks sign up and fills out form and submits ->
  POST /api/users/signup  (submits stringifed JSON object with username and password)
  {
    "username": "Akai"
    "password": "hr47"
  }
3.  server passes back an authenticated jwt which is stored in the 
  client headers and retransmitted with every subsequent request.

LOGIN
1.  user fills out login page and submits ->
  POST /api/users/login (submits JSON object with username and password)
  {
    "username": "Simeon"
    "password": "hr47"
  }

2.  server passes back an authenticated jwt which is stored in the 
  client headers and retransmitted with every subsequent request.


CREATING A JOURNAL ENTRY
1. 