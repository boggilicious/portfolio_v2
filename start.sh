#bin/bash

docker build -t portfolio .

docker run -p 80:80 portfolio
