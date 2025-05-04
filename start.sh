#bin/bash

docker build -t portfolio .

docker run -p 443:443 portfolio
