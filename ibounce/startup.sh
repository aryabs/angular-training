#!/bin/bash
####################################################
# Author Arun Prabhath                             #
# Project iBounce                                  #
####################################################
echo "JAVA_HOME=$JAVA_HOME"
echo "WORK  DIR=$(pwd)"


JAVA_OPTS_HTTP_PORT="-Dcom.inapp.http.port=8080"
JAVA_OPTS_HTTPS_PORT="-Dcom.inapp.https.port=8443"
JAVA_OPTS_KEYSTORE_PATH="-Dcom.inapp.keystore.path=keystore.jks"
JAVA_OPTS_KEYSTORE_PASSWORD="-Dcom.inapp.keystore.password=inapp2.0"
JAVA_OPTS_KEYSTORE_MANAGER_PASSWORD="-Dcom.inapp.keystore.manager.password=inapp2.0"

echo "Starting ibounce server with following JVM parameters:"
echo $JAVA_OPTS_HTTP_PORT
echo $JAVA_OPTS_HTTPS_PORT



if [ ! -z .bounce.pid ]; then
    if [ -f .bounce.pid ]; then
       if [ -s .bounce.pid ]; then
          echo "Existing PID file found during start."
          if [ -r .bounce.pid ]; then
             PID=`cat .bounce.pid`
             ps -p $PID >/dev/null 2>&1
             echo "Bounce appears to still be running with PID $PID. Start aborted."
             exit 1
          fi
       fi
    fi
fi
touch .bounce.pid
$JAVA_HOME/bin/java -Xbootclasspath/p:lib/alpn-boot-8.1.3.v20150130.jar \
                    $JAVA_OPTS_HTTP_PORT \
                    $JAVA_OPTS_HTTPS_PORT \
                    $JAVA_OPTS_KEYSTORE_PATH \
                    $JAVA_OPTS_KEYSTORE_PASSWORD \
                    $JAVA_OPTS_KEYSTORE_MANAGER_PASSWORD \
                    -Djava.net.preferIPV4Stack=true \
                    -cp .:$(echo lib/*.jar | tr ' ' ':'):bounce-0.0.1-SNAPSHOT.jar \
                    com.inapp.bounce.server.BounceEngine > run.log 2>&1 &
echo $! > .bounce.pid
echo "Bounce started successfully PID: `cat .bounce.pid`"
