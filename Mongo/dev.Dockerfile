FROM mongo:latest


RUN mongo admin --host localhost -u USER_PREVIOUSLY_DEFINED -p PASS_YOU_PREVIOUSLY_DEFINED --eval "db.createUser({user: 'ANOTHER_USER', pwd: 'PASS', roles: [{role: 'readWrite', db: 'dev'}]});"