Server-Side Tests:

    - Uses Mocha/Chai and supertest
    - integrated with TravisCI and github for testing on all Pull Requests (TODO)

     Signup/Login for Users

      - Destroy entries in database before/after each test to maintain test integrity 
      - Send the test 'username' and 'password' in the request header

      On User Signup
        - check for new User entry in the database
        - check that authentication token is returned
        - server will return an error if username already exists

      On User Login
        - returns an authentication token if login is successful
        - returns a 401 error if password is incorrect
        - returns a 401 error if user does not exist