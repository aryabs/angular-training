#!/bin/bash
####################################################
# Author Arun Prabhath                             #
# Project iBounce                                  #
####################################################
KILL_SLEEP_INTERVAL=5
if [ -z .bounce.pid ]; then
      echo "Kill failed: bounce.pid not set"
    else
      if [ -f .bounce.pid ]; then
        if [ -s .bounce.pid ]; then
          PID=`cat .bounce.pid`
          echo "Killing Bounce with the PID: $PID"
          kill -9 $PID > /dev/null 2>&1
          while [ $KILL_SLEEP_INTERVAL -ge 0 ]; do
            kill -0 `cat .bounce.pid` >/dev/null 2>&1
            if [ -w .bounce.pid ]; then
               cat /dev/null > .bounce.pid
            else
               echo "The PID file could not be removed."
            fi
            KILL_SLEEP_INTERVAL=0
            echo "The bounce process has been killed."
            break

            if [ $KILL_SLEEP_INTERVAL -gt 0 ]; then
                 sleep 1
            fi
            KILL_SLEEP_INTERVAL=`expr $KILL_SLEEP_INTERVAL - 1 `
            done
         else
           echo "Unable to find the PID. Could not kill the process." 
         fi
      fi
fi
