# koinok_app

Basically the project is based on given assignment. In this project I tried to fullfill all backend requirement of assigment.

Node.JS and it's framework express is used for developing all api's and mongodb is used as database.

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


Move into project backend folder 

run npm install (for downloading all the depandency for backend code)
Create the .env file as .sampleenv which has all your environment variable stored. Give the value of all parmater 
according to your configuration.      

For running backend server move into bin folder and run pm2 start www(pm2 is node process manager)

now we can access the backend server at 3000 port

For checking api server is running hit the api -(get request) http://ip:3000 and you will get response koinok

Nginx proxy is used to deployed the app through which you can access the app via port 80





