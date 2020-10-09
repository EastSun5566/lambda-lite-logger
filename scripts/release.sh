#!/bin/sh

# check out & sync main
git checkout main
git pull

npm run build

# Update & tag version
npm version patch

# push update
git push --follow-tags
git checkout -

npm publish
