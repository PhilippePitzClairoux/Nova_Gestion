import smtplib
import mysql
import mysql.connector as mariadb

mariadb_connection = mariadb.connect(user='root', password='test123', host='localhost', port='3307')
cursor = mariadb_connection.cursor()

TO = 'philippepitz123@gmail.com'
SUBJECT = 'ALERTE D\'INVENTAIRE'

sender_email = 'CHANGE_ME@gmail.com'
sender_password = 'CHANGE_ME'

server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
server.login(sender_email, sender_password)

BODY = '\r\n' \
       'To: {}\n' \
       'From: {}\n' \
       'Subject: {}\n'.format(TO, sender_email, SUBJECT)

cursor.execute("SELECT * FROM `nova_gestion`.notification WHERE viewed = FALSE")
result = cursor.fetchall()

for row in result:
    cursor.execute("SELECT * FROM `nova_gestion`.blank WHERE id_blank = {}".format(row[0]))
    notification_data = cursor.fetchall()[0]

    BODY += "\nLa quantitée minimum ({0} restant) est atteinte pour '{1}' (id : {2})".format(notification_data[4],
                                                                                           notification_data[2],
                                                                                           notification_data[0])
    cursor.execute("UPDATE `nova_gestion`.notification SET viewed = TRUE WHERE id_notification = {}".format(result[0]))

print(BODY)
try:
    server.sendmail(sender_email, [TO], BODY)
except:
    print("error sending email!")

server.quit()
mariadb_connection.commit()

cursor.close()
mariadb_connection.close()