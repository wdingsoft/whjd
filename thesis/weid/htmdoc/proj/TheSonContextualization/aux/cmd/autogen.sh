#!/bin/bash

set -x

ls -al
pwd

cd ./doc_files/exe/doc_file_plugin/
node append2doc.nd.js
cd - 

