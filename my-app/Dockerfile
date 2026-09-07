# --- Stage 1: Build Stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Pass the environment variable so React can bundle it
ARG REACT_APP_GOOGLE_FORM_URL
ENV REACT_APP_GOOGLE_FORM_URL=$REACT_APP_GOOGLE_FORM_URL

# Install dependencies first to leverage Docker cache
COPY package*.json ./
RUN npm install

# Copy all files and build the app
COPY . .

RUN npm run build

# --- Stage 2: Production Stage (Nginx) ---
FROM nginx:stable-alpine

# Copy the build output from the build stage to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Custom Nginx config to handle React Router (fixes 404 on refresh)
RUN printf 'server {\n\
    listen 80;\n\
    location / {\n\
        root /usr/share/nginx/html;\n\
        index index.html index.htm;\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
