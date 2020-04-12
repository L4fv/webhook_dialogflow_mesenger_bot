FROM node:10

COPY [".", "/usr/local/nodeapps/"]

WORKDIR /usr/local/nodeapps
RUN npm install
RUN npm install pm2 -g
RUN pm2 install pm2-logrotate
RUN pm2 set pm2-logrotate:rotateInterval '0 0 */1 * *'
RUN pm2 set pm2-logrotate:dateFormat 'YYYY-MM-DD'
RUN ls

EXPOSE 5011
