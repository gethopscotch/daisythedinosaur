#!/bin/sh
PORT=8080
echo Console is running at: http://localhost:$PORT/client
java -jar `dirname $0`/weinre.jar -boundHost 0.0.0.0 -httpPort $PORT
