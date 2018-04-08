import sys
import smtplib
subject = "Alert usage more then threshold"
to_addr_list = "ankit.malhotra2506@gmail.com"
USERNAME = ''
PASSWORD = ''


def mail(to_addr_list, subject, message, cc_addr_list=[], from_add=USERNAME, username=USERNAME, password=PASSWORD):
    print "check";
    message = "From: {from_addr}\nTo: {to_addr}\nCc: {cc}\nSubject: {subject}\n\n{message}".format(
        from_addr = from_add,
        to_addr = ', '.join(to_addr_list),
        cc = ', '.join(cc_addr_list),
        subject = subject,
        message = message
    )
    server = smtplib.SMTP('smtp.gmail.com:587')
    server.starttls()
    server.login(username, password)
    problems = server.sendmail(from_add, to_addr_list, message)
    server.quit()
    print problems

def main():
    if sys.argv[1] == "both":
        msg = "Memory usage is more than threshold, Currently memory usage is " + sys.argv[2] + " %. and  CPU usage is also more than threshold Currentely, Currentely Usage is " + sys.argv[2] + " %."
    elif sys.argv[1] == "memory":
        msg = "Memory usage is more than threshold, Currently memory usage is " + sys.argv[2] + " %."
    else:
        msg = "CPU usage is more than threshold Currently, Currently Usage is " + sys.argv[2] + " %."
    mail(to_addr_list,subject,msg);


main()