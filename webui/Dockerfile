#############
### build ###
#############

# base image
FROM node:10.9 as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . /app

#RUN cat /app/proxy.conf.json

# install and cache app dependencies
COPY package.json /app/package.json
#RUN npm install -g @angular/cli
RUN npm install
RUN ng build


#CMD ["npm", "start"]

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist/webui /usr/share/nginx/html
COPY nginx.conf /config/nginx.conf
COPY mime.types /config/mime.types
# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;", "-c", "/config/nginx.conf"]
