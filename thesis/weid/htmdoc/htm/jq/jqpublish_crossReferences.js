var generated_appendix_file_list=[];
var generated_files_headers_list=[];

$(document).ready(function(){
  generated_appendix_file_list = LoadJsonFile("generated_appendix_file_list.json");
  generated_files_headers_list = LoadJsonFile("generated_files_headers_list.json");
  Reformat_page();
 
  Keypress_Operation();
});
function aaa_protection(b){
  $('#abstract').text($('#abstract3').text());
  if(!b){
      $("body").css("background-color","#ffffff"); 
      return;
  }
  if(prompt("passcode","")==""){
      $("body").css("background-color","#ffffff");      
  } 
  else $("body").text("err");
}
function Keypress_Operation(){
    aaa_protection(0);
  
  
  ////key press 'e', to edit the page.
  $("body").keypress(function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    
    if(code == 101) { //Enter keycode E
        //alert(code);
        //alert(document.URL);
        var wroot="wroot";
       
        var url =""+document.URL;
        var n=url.search(wroot);
        var url2= url.substring(0,n);
        //alert(url2);
        url2+= wroot+"/tool/_edit/explore/Work.htm?filename=";
        
        //  http://localhost/~weiding/weidroot/weidroot_2017-01-06/app/btool/tool/_edit/explore/Work_htm.htm
        //?fname=/Users/weiding/Sites/weidroot/weidroot_2017-01-06/app/pb/git_svr_proj1/files/htm/works1/3.__03_110_Error_TBI_Characters.htm

        //http://localhost/~weiding/weidroot/weidroot_2017-01-06/app/btool/tool/_edit/explore/Work_htm.htm
        //?fname=/Users/weiding/Sites/weidroot/weidroot_2017-01-06/app/pb/git_svr_proj1/files/htm/works1/0.00_TOC.htm

        //http://localhost/~weiding/weidroot/weidroot_2017-01-06/app/pb/git_svr_proj1/files/htm/works1/wroot/tool/_edit/explore/Work.htm
        //?fname=/Users/weiding/Sites/weidroot/weidroot_2017-01-06/app/pb/git_svr_proj1/files/htm/works1/3.__03_110_Error_TBI_Characters.htm

        var ediurl="../../../../../btool/tool/_edit/explore/Work_htm.htm";
        //ediurl="http://localhost/~weiding/weidroot/weidroot_2017-01-06/app/btool/tool/_edit/explore/Work_htm.htm";
        ediurl+="?fname=../../../../../";

        var iapp=url.indexOf("/app/");
        url=url.substr(iapp);
        ediurl+=url;

        //app/pb/git_svr_proj1/files/htm/works1/3.__03_110_Error_TBI_Characters.htm";
        console.log(ediurl)
        //alert(ediurl);
        window.open(ediurl);

        return;
        
        
        
        var url3 = url.substring(n);
        url3 = "/var/www/html/lamp/" + url3 ;
        
        var urlOpen = url2 + url3;
        var nodsArr=url.split("/");
        var Utils=LoadJsonFile("Utils.php");
        alert(Utils.pwd);
        url3 = Utils.pwd+"/"+nodsArr[nodsArr.length-1];
        urlOpen = url2 + url3;
        
        

        var bodyHeight = $("body").height();
        //alert("bodyHeight="+bodyHeight);

        window.open(urlOpen);
       //e.preventDefault();
       //Do something
     }

    if(code == 102) { //Enter keycode File
        var bodyHeight = $(document).height();
        var fileHeight="<a style='position=fix; left-margin=0px'>h="+bodyHeight + ",w=" + $("body").width() + ",</a>";
        $("body").append(fileHeight);

        //alert("bodyHeight="+bodyHeight + ",w=" + $(document).width() );
     }
     
     if(code == "o".charCodeAt(0)) { //Enter o  
        if( $.m_origidoc===1){
            $.m_origidoc=null;
            $(".localDoc").html("");
        }else{
            $.m_origidoc=1;
            $(".localDoc").attr("target","_blank").each(function(){
                var hrf=$(this).attr("href");
                $(this).html("<font color='red'>(localDoc:"+hrf+")</font>");
            });
        }

        //alert("bodyHeight="+bodyHeight + ",w=" + $(document).width() );
     }



  });
      
}
function Reformat_page(){
    Reformat_CrossReference_To_UpperNotes("./7.01_000_References.htm");
    Reformat_Appendix_In_Text();
    
    Load_AbbreviationList("7.03_000_Abbrev.json");
}

function Reformat_Appendix_In_Text(){
    for(var i=0;i<generated_appendix_file_list.length;i++){
        var shref=generated_appendix_file_list[i];        
        var headline=generated_files_headers_list[shref];
        //console.log(shref,headline);
        if( headline ){
            var indx=i+1;//1 based.
            var appdx=" (Appendix "+indx +": "+headline +") ";
            if( $("a[name='"+shref+"']").length>0 ){                
                $("a[href='./"+shref+"']").text(appdx).attr("href","#"+shref).addClass("appendix_item");
            }
            else{
                $("a[href='./"+shref+"']").text(appdx).attr("target","_blank").addClass("appendix_item");
            }
        }
        else{
            alert("headline errrrrrr="+shref);
        }        
    }
}
function Reformat_CrossReference_To_UpperNotes(sRemoteReferencesHtmFile){
  //////////////////////////////////////////
  //foot notes automation
  function Notes2Indx(sRemoteReferencesHtmFile){
       var NOTE2IDX = new Object();
       var NoteArr=[];
       var RemoteReferences=getRemoteReferences(sRemoteReferencesHtmFile);
       $(RemoteReferences).find("a[name]").each(function(i){
         var snme=$(this).attr("name");
         //alert(i+"="+s);
         var idx = 1 + i;
         if(!!NOTE2IDX[snme]){
            alert(snme+": was found duplicated. please correct it. at idx=" + idx);
            var pos = NoteArr.indexOf(snme);
            console.log(" + + + duplicated to footnote: pos="+pos+",name="+snme);
         }
         NoteArr.push(snme);
         NOTE2IDX[snme]=""+idx;
         $(this).closest( "li" ).attr("value",idx);
         
         //debug
         //var txt = $(this).closest( "li" ).text();
         //console.log("footnote: idx="+idx+",name="+snme+",txt="+txt);
       });
       return NOTE2IDX;
  };//
  
  var NOTE2IDX = Notes2Indx(sRemoteReferencesHtmFile);
  var src = $("body").html();
  //alert(src); //original letters only reg: /(\[\w+\])/gm 
  
  var localFootNoteIndx=0;
  src = src.replace(/(\[[\w\s0-9\.\:\-]+\])/gm, function($1){
        var s1=$1;
        var s2=s1.replace(/\[|\]/g,'');
        var sidx = NOTE2IDX[s2];
        if(undefined === sidx ){
            console.error(sRemoteReferencesHtmFile+"@ "+s1 + ", error on footnote name:"+ s2);
            sidx="<font color='red'>ERRORS:"+s1+"</font>";
            localFootNoteIndx++;
            sidx=localFootNoteIndx;   
            return "<sup>[<a href='"+sRemoteReferencesHtmFile+"#"+s2+"'>"+sidx+"</a>]</sup>";
        }
        var ank=$("a[name='"+s2+"']");
        var ssa="<a target='_blank' href='"+sRemoteReferencesHtmFile+"#"+s2+"'>"+sidx+"</a>";
        
        if(ank.length>=1){//link found in same page.
            ssa="<a href='#"+s2+"'>"+sidx+"</a>";
        }
        return "<sup>["+ssa+"]</sup>";
  });
  
  $("body").html(src);  
    ////////////////////////////
};    
function Load_AbbreviationList(jsonFilename){
  
    var abbrObj=LoadJsonFile(jsonFilename);
    // Get array of keys from the old/current object
    var keys = Object.keys(abbrObj);
    // Sort keys (in place)
    keys.sort();
  
    $.each(keys, function(i,k){
        //console.log(k,v);
        var sli="<p><a class='abbrev'>"+k+"</a>: " +  abbrObj[k] + "</p>";
        $("#Abbreviation").append(sli);
    });
}

function getRemoteReferences(sHtmFile) {
    return $.ajax({
        type: "GET",
        dataType:"text",
        url: sHtmFile,
        async: false
    }).responseText;
};
function LoadJsonFile(jsfile) {
    var jsn = $.ajax({
        type: "POST",
        dataType:"json",
        url: jsfile,
        async: false
    }).responseText;
    
    return JSON.parse(jsn);
};













