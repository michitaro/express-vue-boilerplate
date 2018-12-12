root=$(dirname $0)

(
  cd $root/../frontend
  npm install
  npm run build
)

(
  cd $root/../backend
  npm install
)