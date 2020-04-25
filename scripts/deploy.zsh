#!/bin/zsh

yarn build

ssh pi-crust "pkill -9 node"

rsync -avz -e "ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null" --progress build/ pi-crust.local:/home/ryan/Serve/tess-bday-2020 --delete

ssh pi-crust "nohup /home/ryan/.yarn/bin/serve -s /home/ryan/Serve/tess-bday-2020 > /dev/null 2>&1 &"
