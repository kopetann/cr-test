#!/usr/bin/env bash
until cd /usr/local/app; do
    echo 'Waiting for app mount...'
done

npm run ci
npm run start:dev