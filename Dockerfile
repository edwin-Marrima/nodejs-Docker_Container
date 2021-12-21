FROM node:17-alpine3.12
WORKDIR /app
COPY package.json .
#verify if node is running in development or production environment
# ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; \
#     then npm install; \
#     else npm instal --only=production; \
#     fi
COPY . ./
ENV PORT=3000
#EXPOSE - does't open any port, it's is set for documentation propose
EXPOSE $PORT
CMD ["node","index.js"]



