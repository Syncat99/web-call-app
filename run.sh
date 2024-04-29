#!/bin/sh
params="npx concurrently"
for d in ./packages/*/; do
    params="$params \"cd $d & $@\""
done
eval $params
