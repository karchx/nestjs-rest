CREATE USER user_api WITH PASSWORD 'abc123';
GRANT ALL PRIVILEGES ON DATABASE "api-db" to user_api;
ALTER DATABASE "api-db" OWNER to user_api;