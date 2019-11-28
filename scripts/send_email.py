import smtplib
import mysql
import mysql.connector as mariadb

mariadb_connection = mariadb.connect(user='root', password='test123', host='localhost', port='3307')
cursor = mariadb_connection.cursor()

TO = 'philippepitz123@gmail.com'
SUBJECT = 'ALERTE D\'INVENTAIRE'

sender_email = 'CHANGEME@gmail.com'
sender_password = 'CHANGE_ME'

# server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
# server.login(sender_email, sender_password)

BODY = '\r\n' \
       'To: %s' \
       'From: %s' \
       'Subject: %s\n'.format(TO, sender_email, SUBJECT)


cursor.execute("SELECT * FROM `nova_gestion`.notification WHERE viewed = FALSE")
result = cursor.fetchall()

for row in result:
    cursor.execute("SELECT * FROM `nova_gestion`.blank WHERE id_blank = %s".format(row[0]))
    notification_data = cursor.fetchall()
    BODY += "\nLa quantitée minimum ({} restant) est atteinte pour {} (id : {})".format(notification_data[2],
                                                                                        notification_data[1],
                                                                                        notification_data[0])
print(BODY)
# try:
#     server.sendmail(sender_email, [TO], BODY)
# except:
#     print("error sending email!")
#
# server.quit()