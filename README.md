# koinok_app

Basically the project is based on given assignment. In this project I tried to fullfill the requirement of assigment.

Node.JS and it's framework express is used for developing all api's and mongodb is used as database. For front-end angularjs is used.

In this project basically user can create their account in the portal and can genearte the ether wallet in the system. 
Two factor authentication is added with google authenticator. 

# Installation Steps
Insatll node.js in system 
https://www.metachris.com/2017/01/how-to-install-nodejs-6-lts-on-ubuntu-and-centos/

Install mongo db in syatem
https://docs.mongodb.com/v3.4/tutorial/install-mongodb-on-ubuntu/

Install pm2 globally 
npm install pm2 -g

Clone the repo 
git clone https://github.com/ankitm27/koinok_app

There is two folder front end and backend. Both the app has written seprately.

Move into project backend folder 
run npm install (for downloading all the depandency for backend code)
Create the .env file as .sampleenv which has all your environment variable stored. Give the value of all parmater 
according to your configuration.      
For running backend server move into bin folder and run pm2 start www(pm2 is node process manager)
now we can access the backend server at 3000 port
for check api server is running hit the api -(get request) http://ip:3000 and you will get response koinok

Move into project frontend folder 
run npm install(for downloading all the depandency for frontend code)
Create the .env file ad .sampleenv which has all your enviroment variable stored. Give the value of all parameter according 
to your configuration.   
For running front end server run pm2 start
now we can access the front end code at 8080 port
now you can access the code at http://ip:8080/#!

Nginx proxy is deployed to access the app.
server link - http://13.127.73.144/#/!







