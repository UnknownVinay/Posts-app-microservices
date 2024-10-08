# setting a base image
FROM node:alpine

#setting the directory where code files should be placed in container
WORKDIR /app

#Coping the package.json file so that updated package can be installed
COPY ./package.json ./

#installing the dependencies and packages
RUN npm install

#coping the other files 
COPY ./ ./

#setting a default command as start command
CMD ["npm","start"]