FROM mariadb:latest

COPY *.sql /docker-entrypoint-initdb.d/
COPY utf8.cnf /etc/mysql/mariadb.conf.d/
