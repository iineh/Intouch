# Use the official MySQL Docker image
FROM mysql:latest

# Set the root password for MySQL
ENV MYSQL_ROOT_PASSWORD iseveShare4rce.

# Create a new database and user
# ENV MYSQL_DATABASE contacts_db
# ENV MYSQL_USER LU001intouch_user
# ENV MYSQL_PASSWORD iseveShare4rce.

# Copy the SQL initialization script to the container
COPY ./init.sql /docker-entrypoint-initdb.d/init.sql

# Expose the default MySQL port
EXPOSE 3306
