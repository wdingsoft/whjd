#!/bin/bash

set -x

ls -al
pwd

cd ./doc_files/_exe/_tabler/
node append2doc.nd.js
cd - 

