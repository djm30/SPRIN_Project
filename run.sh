#!/bin/bash 
npm install 
cd src/frontend && npm install && npm run build 
cd ../../ 
npm run full
