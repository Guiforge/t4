#!/usr/bin/env bash

errorExit() {
    echo 'EXIT+++++'
    kill $( jobs -p ) 2>&-; exit
}

trap 'errorExit' EXIT
trap 'errorExit' SIGTERM
trap 'errorExit' SIGHUP
trap 'errorExit' SIGINT
trap 'errorExit' SIGQUIT


poc() {
    echo 'Before you should create VM with docker-machine'
    echo 'Launch Server'
    echo "VM use: $1"
    docker-machine start $1;eval $(docker-machine env $1);
    docker-compose -f docker-compose.dev.yaml stop # stop
    docker-compose -f docker-compose.dev.yaml up -d # up service back

    echo 'Launch UI'
    (cd t4_front; node mitm.js)& # man in the middle
    cd t4_front; npm run dev # build and serve app.js
}

tester() {
    echo 'Before you should create VM with docker-machine'
    echo 'Launch Server'
    echo "VM use $1, debug?: $2"
    docker-machine start $1 ; eval $(docker-machine env t4)
    docker-compose -f docker-compose.dev.yaml stop
    env NORATE=$2 docker-compose -f docker-compose.dev.yaml up -d
    sleep 5
    if [[ $2 != '' ]]; then
        cd tester; npm run debug
    else
        cd tester; npm run test
    fi
}

echo 'launch:'
echo 'for launch POC: ./launch poc <NAME OF VM>'
echo 'for launch tests: ./launch test <NAME OF VM> [DEBUG?]'
echo -e "\t Example poc: ./launch poc t4"
echo -e "\t Example tests: ./launch test t4 "
echo -e "\t Example tests with debug: ./launch test t4 1 "
echo 
if [[ $1 == "poc" ]]; then
    poc $2
elif [[ $1 == "test" ]]; then
    tester $2 $3
fi