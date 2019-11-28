import mysql
import mysql.connector as mariadb

mariadb_connection = mariadb.connect(user='root', password='test123', host='localhost', port='3307')
cursor = mariadb_connection.cursor()

cursor.execute("SELECT * FROM `nova_gestion`.blank")
result = cursor.fetchall()
print(result)
for row in result :
    if (row[4] >= row[3]):
        cursor.execute("INSERT INTO `nova_gestion`.notification(id_blank, viewed) VALUES ({}, {})".format(row[0], 0))

mariadb_connection.commit()

cursor.close()
mariadb_connection.close()