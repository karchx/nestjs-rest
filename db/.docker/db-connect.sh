#!/bin/bash

# ROOT:
if [[ $1 != '' ]]; then
    if [[ $1 == 'root' ]]; then
        docker exec -it pg-container psql --username postgres --password
    else
        docker exec -it pg-container psql --username user_api -d api-db
    fi
else
    echo "ERROR: you send a mode script: root or user"
fi
