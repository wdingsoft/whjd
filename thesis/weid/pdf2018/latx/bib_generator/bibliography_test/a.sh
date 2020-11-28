#!/bin/sh


clean_up()
{
Dir="./" 

echo "\n clean up .."

chmod -R 777 *

for i in ".DS*" "*.aux" "*.log" "*.lof"  "*.lot"  "*.out"  "*.run.xml"  "*.toc"  "*-blx.bib"  "*.blg"  "*.bbl" "*.dvi"
do
    echo "delete: $i"
    find ${Dir} -type f -name $i -delete
    find ${Dir} -type f -name $i 
done

}








main="main"
TargetDir="/Users/weiding/Downloads/"
LogDiff="/tmp/logdif.txt"
# step 1:
pdflatex ${main}.tex
# step 2: for bibiography .bib files. 
bibtex   ${main}.aux
# step3: 
pdflatex ${main}.tex
pdflatex ${main}.tex


diff   ${main}.log  ${TargetDir}${main}.log  > ${LogDiff}
mv -vf ${main}.log  ${TargetDir}${main}.log 

 
clean_up
clean_up

echo "\n\n<<<<<<<<<<log diff>>>>>>>\n"
cat ${LogDiff}


# bak pdf file.
cmd="mv -vf ${main}.pdf /Users/weiding/Downloads/thesis_bib.pdf"
echo "\n + + +\n"
pwd
${cmd}

# cleanup
echo "\nEnd"










