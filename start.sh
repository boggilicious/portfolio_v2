#bin/bash

docker build -t portfolio .

docker run -v /etc/letsencrypt:/etc/letsencrypt:ro -p 443:443 portfolio
