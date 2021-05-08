#!/bin/bash

#@echo
set echo on

./aux/cmd/tidy_git_diff.sh


################################################################
git status

echo
echo
echo 

git add *

echo
echo
echo

git commit -m "texting"

git status


##################################################################
# http://tidy.sourceforge.net/docs/quickref.html#preserve-entities
#tidy --drop-empty-elements no --drop-empty-paras no -i -w 0 -c -m doc.html





#################################################################
git diff --ignore-space-at-eol -b -w --ignore-blank-lines --color-words=.







#################################################################
git diff --ignore-space-at-eol -b -w --ignore-blank-lines 



################################################################
git status

git commit -m "texting"




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
