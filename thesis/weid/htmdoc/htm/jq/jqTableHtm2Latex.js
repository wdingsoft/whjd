
$(document).ready(function(){

    $("table").click(function(){
        //outext for bib table.
        var sout="";
        var caption=$(this).find("caption").text().trim();
        //sout+=$.trim(caption);
        sout+="\n";
        var ncols=$(this).find("tr:eq(0)").find("td").length;
        sout+=getlatexTableBegin(ncols, caption);


        $(this).find("tr").each(function(){
          var srow="";
          $(this).find("td , th").each(function(){
            var item="";
            $(this).find("*").each(function(){
              var tagname=$(this).prop("tagName");
              console.log(tagname);
              switch(tagname){
                case "IMG":
                var src=$(this).attr("src");
                srow+=getlatexImg("",src);
                break;

                case "A":
                var txt=$(this).text().trim();
                item+=txt;
                break;

                case "BR":
                return;

                default:
                //item+=$("this").text().trim();
                return;
              }
              item+="\n";

               
            });//
            if(item.length>0){
              srow+=item;
            }
            else{
              srow+=$(this).text().trim();
            }

            srow+="\n\&\n";     
          });//tr

          srow=srow.substr(0,srow.length-2);
          srow+="\n\n \\tabularnewline \\hline \n\n\n";

          sout+=srow;
        });



        sout+=getlatexTableEnd();

        sout=sout.replace("#","\\#");
        $("#out").val(sout);


        console.log("a table is clicked.")
    });

});/////////////////////////////////////


function getlatexImg(dir, src){
  //../../../../../../___bigdata/___compact/___solid/odb/tbi/img/jgif/62843.gif
  //var pe=new RegExp("(\/tbi\/img\/jgif\/)([\d]+)([\.]gif)","i");
  var v1="/odb/tbi/img/jgif/";
  var v2="/odb/tbi/jpegOBI/";
  var reg=new RegExp(v1,"i");
  var mat=src.search(reg);
  if(mat>=0){
    console.log("mat", mat);
    src=src.replace(reg, v2);
    src=src.replace(/[\.]gif$/, ".jpg");
  }
  //var src2=src.replace("/img/")
  //odb/tbi/pngOBI/62861.png

  var scale=$("#scale").val();

  var ss="";
  ss+="\\raisebox{-\\totalheight} {          \n";
  ss+="\\includegraphics[scale="+scale+"]\n";
  //ss+="trim={4.9cm 27cm 15.5cm 2.2cm},clip \n";
  //ss+="]\n";
  ss+="{"+dir+src+"}}\n"; 

  return ss;
}
function getlatexTableBegin(ncols, caption){

  var ss="\\begin{longtable}{|";

  //var ss="\\begin{tabular}{|";
  //c|c|c|c|c|c|c|c|c|c|}
  for(var i=0;i<ncols; i++){
    ss+="c|";
  }
  ss+="}\n";

  ss+="\\caption{"+caption+"}\n";
  ss+="\\label{tab:treatments} \n";
  ss+="\\centering \n";

  ss+="\\setlength\\LTleft{0pt}  \n";
  ss+="\\setlength\\LTright{0pt} \n";

  ss+="\\tabularnewline\\hline \n\n";

  return ss;
}
function getlatexTableEnd(src){
  return "\n\n\\end{longtable}\n\n";
  //return "\n\n\\end{tabular}\n\n";
}
