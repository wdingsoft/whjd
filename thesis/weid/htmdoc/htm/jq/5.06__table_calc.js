$(document).ready(function(){

 //alert( $("table:eq(0) tr:first-child td:eq("+10+ ")").text() );


  $("table:eq(5) tr:eq(1) td").each(function(i){
      if( i > 0 && i <16 ){
         //var dat = $("table:eq(0) tr:eq(62) td:eq("+ (1+i) + ")").text();
         //$(this).text( dat );
      };
  });


Table_Calc_Process_Rain_Freq();

Table_Calc_Process_Date_Distribution();

});//ready
function Table_Calc_Process_Rain_Freq(){

   var DestTableID="#RainFreqCalc";//4; //Precipitition Comperison between Shang dynasty and Today at Anyang
   var iDestRow=1;  //starting row for calc.

   //copy src table data into destination table.
   //table rain freq
   ////srcTableID, srcRow, srcColStart, srcColEnd, destTableID, destRow, destColStart){
  cpySrc2DestTable({srcTableID:"#RainFreqTable",srcRow:62,srcColStart:1,srcColEnd:15,destTableID:DestTableID,destRow:iDestRow+1,destColStart:1});
  cpySrc2DestTable({srcTableID:"#RainFreqTable",srcRow:63,srcColStart:1,srcColEnd:15,destTableID:DestTableID,destRow:iDestRow+2,destColStart:1});
  cpySrc2DestTable({srcTableID:"#RainFreqTable",srcRow:64,srcColStart:1,srcColEnd:15,destTableID:DestTableID,destRow:iDestRow+3,destColStart:1});
                                                                                                                                             
  //table day-months                                                                                                                         
  cpySrc2DestTable({srcTableID:"#MonthDayTable",srcRow:62,srcColStart:1,srcColEnd:15,destTableID:DestTableID,destRow:iDestRow+4,destColStart:1});
  cpySrc2DestTable({srcTableID:"#MonthDayTable",srcRow:63,srcColStart:1,srcColEnd:15,destTableID:DestTableID,destRow:iDestRow+5,destColStart:1});
  cpySrc2DestTable({srcTableID:"#MonthDayTable",srcRow:64,srcColStart:1,srcColEnd:15,destTableID:DestTableID,destRow:iDestRow+6,destColStart:1});

  
  
  //
  for(var i=1;i<=6;i+=1){
	//adjust1stMonthByZhen({destTableID:DestTableID,destRow:iDestRow+i});
  }
  
  
  
  
  //climate table ClimateDataAnyang
  //cpySrc2DestTable(   "#ClimateDataAnyang", 4, 3, 11,   DestTableID,  iDestRow+14, 1);
  //cpySrc2DestTable(   "#ClimateDataAnyang", 4, 0, 2,   DestTableID,  iDestRow+14, 10);
  //cpySrc2DestTable(   "#ClimateDataAnyang", 1, 3, 11,   DestTableID,  iDestRow+15, 1);
  //cpySrc2DestTable(   "#ClimateDataAnyang", 1, 0, 2,   DestTableID,  iDestRow+15, 10);

  
  
	  
	  
	  
	//make calculation on destination table.  RainFreqCalc
	////srcTableIndx, srcRow, srcColStart, srcColEnd, srcRowOffset, destRow,  iUseZhenMonthCol

	calcRate({srcTableIndx:DestTableID,srcRow:iDestRow+1,srcColStart:1,srcColEnd:14,srcRowOffset:3,destRow:iDestRow+7, iUseZhenMonthCol:-1});
	calcRate({srcTableIndx:DestTableID,srcRow:iDestRow+2,srcColStart:1,srcColEnd:14,srcRowOffset:3,destRow:iDestRow+8, iUseZhenMonthCol:-1});
	calcRate({srcTableIndx:DestTableID,srcRow:iDestRow+3,srcColStart:1,srcColEnd:14,srcRowOffset:3,destRow:iDestRow+9, iUseZhenMonthCol:-1});
	calcRate({srcTableIndx:DestTableID,srcRow:iDestRow+1,srcColStart:1,srcColEnd:14,srcRowOffset:3,destRow:iDestRow+10,iUseZhenMonthCol:15});
	calcRate({srcTableIndx:DestTableID,srcRow:iDestRow+2,srcColStart:1,srcColEnd:14,srcRowOffset:3,destRow:iDestRow+11,iUseZhenMonthCol:15});
	calcRate({srcTableIndx:DestTableID,srcRow:iDestRow+3,srcColStart:1,srcColEnd:14,srcRowOffset:3,destRow:iDestRow+12,iUseZhenMonthCol:15});


	//////////////////////////////////////////////////////////////
	//$("td").css("background", "green"); OldLace
	setTableRowColor(DestTableID, iDestRow+1, 1,14, "Aquamarine");
	setTableRowColor(DestTableID, iDestRow+2, 1,14, "Aquamarine");
	setTableRowColor(DestTableID, iDestRow+3, 1,14, "Aquamarine");

	setTableRowColor(DestTableID, iDestRow+4, 1,14, "Azure");
	setTableRowColor(DestTableID, iDestRow+5, 1,14, "Azure");
	setTableRowColor(DestTableID, iDestRow+6, 1,14, "Azure");

	setTableRowColor(DestTableID, iDestRow+7, 1,14, "OldLace");
	setTableRowColor(DestTableID, iDestRow+8, 1,14, "OldLace");
	setTableRowColor(DestTableID, iDestRow+9, 1,14, "OldLace");


	setTableRowColor(DestTableID, iDestRow+10, 1,14, "lightgrey");
	setTableRowColor(DestTableID, iDestRow+11, 1,14, "lightgrey");
	setTableRowColor(DestTableID, iDestRow+12, 1,14, "lightgrey");

	setTableRowColor(DestTableID, iDestRow+10, 1,1, "grey");
	setTableRowColor(DestTableID, iDestRow+11, 1,1, "grey");
	setTableRowColor(DestTableID, iDestRow+12, 1,1, "grey");

	setTableRowColor(DestTableID, iDestRow+13, 4,4, "LimeGreen");
}///////////////////////////Table_Calc_Process_Rain_Freq/////////////

function Table_Calc_Process_Date_Distribution(){
	// Table: Calculation of Propability of Numbers of Days For Each Month
	var iT14month = calc_tot_in_row("#MonthDayTable", 64, 1,14);//2,15); 
	$(".Tot14months").text(iT14month).css("background-color","#ffffff");


	var iTot12months = calc_tot_in_row("#MonthDayTable", 64, 1,12);//2,13);
	$(".Tot12months ").text( iTot12months ).css("background-color","#ffffff");

	var iAvg12months= Math.round( iTot12months/12 );
	$(".Avg12months").text( iAvg12months ).css("background-color","#ffffff");


	var pAvg12months = 100 * iTot12months / 12.0 / parseFloat( iT14month ); 
	$(".pAvg12months").text( pAvg12months.toFixed(2) +" %" ).css("background-color","#ffffff");

	//////////////////////////////
	//////
	var iT13month = calc_tot_in_row("#MonthDayTable", 64, 13,13);//14,14);
	$(".Month13").text( iT13month ).css("background-color","#ffffff");

	var pMonth13 = 100 * iT13month / parseFloat( iT14month ); 
	$(".pMonth13").text( pMonth13.toFixed(2) +" %"  ).css("background-color","#ffffff");

	//////////////////////////
	//14th month
	var month14 = calc_tot_in_row("#MonthDayTable", 64, 14,14);//14,14);
	var propability = 100 * parseFloat(month14) / parseFloat( iT14month ); 
	$(".Month14").text( month14 );
	$(".pMonth14").text( propability.toFixed(2)  +" %").css("background-color","#ffffff");
	/////////////////
	/////////////////
}/////Table_Calc_Process_Date_Distribution/////////////








function cpTableMatrx(srcTableIndx, srcRow, srcColStart, srcColEnd, destTableInx, destRow, destColStart){

  $("table:eq("+destTableInx+") tr:eq("+destRow+") td").each(function(i){
      var dlt = srcColStart - destColStart;
	 
      if( i >= destColStart && i <= srcColEnd - dlt ){
 
         var dat = $("table:eq("+srcTableIndx+") tr:eq("+srcRow+") td:eq(" + (dlt+i) + ")" ).text();
         $(this).text( dat );
      };
  });
}//////////cpTableMatrx

function cpySrc2DestTable(parms){
//srcTableID, srcRow, srcColStart, srcColEnd, destTableID, destRow, destColStart){

  $( parms.destTableID +" tr:eq("+parms.destRow+") td").each(function(i){
      var dlt = parms.srcColStart - parms.destColStart;
	 
      if( i >= parms.destColStart && i <= parms.srcColEnd - dlt ){
 
         var dat = $(parms.srcTableID+" tr:eq("+parms.srcRow+") td:eq(" + (dlt+i) + ")" ).text();
         $(this).text( dat );
      };
  });
}//////////cpySrc2DestTable

function adjust1stMonthByZhen(parms){
  var tdObj=$( parms.destTableID +" tr:eq("+parms.destRow+") td:eq("+1+")");
  var m1=$(tdObj).text();
  var z1=$( parms.destTableID +" tr:eq("+parms.destRow+") td:eq("+15+")").text();
  var adj=  parseInt(m1) + parseInt(z1);
  $(tdObj).text(adj);
}//////////adjust1stMonthByZhen

function calcRate(parm){
//srcTableIndx, srcRow, srcColStart, srcColEnd, srcRowOffset, destRow,  iUseZhenMonthCol

  $(parm.srcTableIndx+" tr:eq("+parm.srcRow+") td").each(function(i){

	 
      if( i >= parm.srcColStart && i <= parm.srcColEnd ){
 
         var dat1 = $(parm.srcTableIndx+" tr:eq("+parm.srcRow+") td:eq(" + (i) + ")" ).text();
         var dat2 = $(parm.srcTableIndx+" tr:eq("+(parm.srcRow+parm.srcRowOffset)+") td:eq(" + (i) + ")" ).text();

         var rate = parseFloat(dat1 ) / parseFloat(dat2 )  * 100  ;
         if ( parm.iUseZhenMonthCol  > 0   &&  parm.srcColStart  ==  i ) {
                    var ZhenMonth1 = $(parm.srcTableIndx+" tr:eq("+(parm.srcRow)+") td:eq(" + ( parm.iUseZhenMonthCol  ) + ")" ).text();
                    var ZhenMonth2 = $(parm.srcTableIndx+" tr:eq("+(parm.srcRow+parm.srcRowOffset)+") td:eq(" + ( parm.iUseZhenMonthCol  ) + ")" ).text();
                    rate = (parseFloat(ZhenMonth1) + parseFloat(dat1) )  / (parseFloat(dat2 ) + parseFloat(ZhenMonth2 ))  * 100  ;
         }

         $(parm.srcTableIndx+" tr:eq("+(parm.destRow)+") td:eq(" + (i) + ")" ).text(rate.toFixed(2) );
      };
  });
}//////////calcRate
function calcRate_bk(srcTableIndx, srcRow, srcColStart, srcColEnd, srcRowOffset, destRow,  iUseZhenMonthCol){

  $("table:eq("+srcTableIndx+") tr:eq("+srcRow+") td").each(function(i){

	 
      if( i >= srcColStart && i <= srcColEnd ){
 
         var dat1 = $("table:eq("+srcTableIndx+") tr:eq("+srcRow+") td:eq(" + (i) + ")" ).text();
         var dat2 = $("table:eq("+srcTableIndx+") tr:eq("+(srcRow+srcRowOffset)+") td:eq(" + (i) + ")" ).text();

         var rate = parseFloat(dat1 ) / parseFloat(dat2 )  * 100  ;
         if ( iUseZhenMonthCol  > 0   &&  srcColStart  ==  i ) {
                    var ZhenMonth1 = $("table:eq("+srcTableIndx+") tr:eq("+(srcRow)+") td:eq(" + ( iUseZhenMonthCol  ) + ")" ).text();
                    var ZhenMonth2 = $("table:eq("+srcTableIndx+") tr:eq("+(srcRow+srcRowOffset)+") td:eq(" + ( iUseZhenMonthCol  ) + ")" ).text();
                    rate = (parseFloat(ZhenMonth1) + parseFloat(dat1) )  / (parseFloat(dat2 ) + parseFloat(ZhenMonth2 ))  * 100  ;
         }

         $("table:eq("+srcTableIndx+") tr:eq("+(destRow)+") td:eq(" + (i) + ")" ).text(rate.toFixed(2) );
      };
  });
}//////////calcRate

function setTableRowColor(tableIdx, rowIdx, colIdxStart,colIdxEnd,scolr){
   $(tableIdx+" tr:eq("+rowIdx+") td").each(function(i){	 
      if( i >= colIdxStart && i <= colIdxEnd ){
             $(this).css("background", scolr);
      };
  });
}///////setTableRowColor

function calc_tot_in_row(tableIdx, rowIdx, colIdxStart,colIdxEnd,scolr){
   var tot=0;
   $(tableIdx+" tr:eq("+rowIdx+") td").each(function(i){	 
      if( i >= colIdxStart && i <= colIdxEnd ){
             var val = parseInt($(this).text());
             tot += val;
      };
  });
  return parseInt(tot);
}///////setTableRowColor