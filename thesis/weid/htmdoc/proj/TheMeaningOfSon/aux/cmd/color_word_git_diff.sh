#!/bin/bash



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

