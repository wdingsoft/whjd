<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
        
		<link href="../../../files/_css/theme000.css?a=1" rel="stylesheet" type="text/css" />
        
		<script src="../../../files/_js/jquery.min.js">
        
        
        
</script><script src="../../../files/_js/jqpublish_crossReferences.js">
</script>
<script src="../../../files/_js/jqpublish_all_in_one_page.js">
</script>

<script src="../../../files/_js/jqTableHtm2Latex.js">
</script>

<script type='text/javascript' xxxxxxxxxxxxsrc='https://www.google.com/jsapi'></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type='text/javascript' src='../../../files/_js/googlechart_callbackFunctions.js'></script>  

<script>
$(function() {
  $("#findAllLinks").click(function(){
    alert();
    var linklist="";
    $("#toc").find("a").each(function(){
        var href=$(this).attr("href");
        linklist+="\""+href+"\",<br>";
    });
    $("#out").html(linklist);
    
  });
  
  $("#BtnDoFormat").click(function(){
    UpperNotes_format();
    FootNotesAutoMatch("./7.01_000_References.htm");
  
    change_toc_href_into_local();
    enum_h1_h2();
    
    
    GenAppendix();
    alert("ok");
  });
});////
</script>


	</head>
	<body>
<div id="menu">
<input id="scale" value="0.2" title="image scale in latex"></input><br>
<textarea id="out"></textarea>    
</div>


<button id="BtnDoFormat">.</button>


<?php
include("../../php/Gen2one.php");

//GenUti::GenFileH2Json("./");

echo GenUti::GetBody("./0.00_Cover.htm","Cover","");

$gg = new Gen2one();
$gg->main("./0.00_TOC.json");
//exit(0);

//$gg->show_toc();

//echo $gg->MainBodyHtml;

//echo "<hr/><p/>";
//$gg->show_Appendex_list();
//echo "<hr/><p/>";
//$gg->show_AppendexHtml();

//echo $gg->GetBody("./7.03_000_Abbrev.htm");
?>

<br/><hr/>
<p>Debug</p>

<div id='dbg'></div>
</body>
</html>