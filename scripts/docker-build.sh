rm -rf docker/files
mkdir -p docker/files
rsync --delete --exclude={node_modules,packages-lock.json} -a ./backend ./frontend ./scripts ./shared docker/files
docker build -t simple-echo docker