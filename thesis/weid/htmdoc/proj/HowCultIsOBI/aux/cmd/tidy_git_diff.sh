#!/bin/bash



##################################################################
# http://tidy.sourceforge.net/docs/quickref.html#preserve-entities
echo "================= tidy --drop-empty-elements no --drop-empty-paras no -i -w 0 -c -m doc.html ================================"
tidy --drop-empty-elements no --drop-empty-paras no -i -w 0 -c -m doc.html
### --drop-empty-elements default is yes.
### --drop-empty-paras default is yes   #paragraphs





#################################################################
echo "==================== node em_key_words.nd.js ============================="
cd ./aux/exe/doc_file_plugin/
node em_key_words.nd.js
cd -

################################################################
echo "==================== node ploadfile2doc.nd.js ============================="
cd ./aux/exe/doc_file_plugin/
node ploadfiles2doc.nd.js
cd - 





#################################################################
echo
echo "================= git diff --ignore-space-at-eol -b -w --ignore-blank-lines  ================================"
git diff --ignore-space-at-eol -b -w --ignore-blank-lines 



#################################################################
echo "================= git diff --ignore-space-at-eol -b -w --ignore-blank-lines --color-words=. ================================"
git diff --ignore-space-at-eol -b -w --ignore-blank-lines --color-words=.





################################################################
echo "================= git status ================================"
git status

################################################################
echo "================= git branch ================================"
git branch


#################################################################
echo "================= ls -al ================================"
ls -al



####################################################
#
#  --ignore-space-at-eol
#  Ignore changes in whitespace at EOL.
#  
#  -b
#  --ignore-space-change
#  Ignore changes in amount of whitespace. This ignores whitespace at line end, and considers all other sequences of one or more whitespace characters to be equivalent.
#  
#  -w
#  --ignore-all-space
#  Ignore whitespace when comparing lines. This ignores differences even if one line has whitespace where the other line has none.
#  
#  [git version 1.8.4+]--ignore-blank-lines
#
#####################################################

