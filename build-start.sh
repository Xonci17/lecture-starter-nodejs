#!/bin/bash
cd client 
yarn install
yarn run build
cd ..
yarn install
yarn start