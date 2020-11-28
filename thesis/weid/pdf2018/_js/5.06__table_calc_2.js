$(document).ready(function(){

 //alert( $("table:eq(0) tr:first-child td:eq("+10+ ")").text() );


  $("table:eq(5) tr:eq(1) td").each(function(i){
      if( i > 0 && i <16 ){
         //var dat = $("table:eq(0) tr:eq(62) td:eq("+ (1+i) + ")").text();
         //$(this).text( dat );
      };
  });

   var DestTableID="#RainFreqCalc";//4; //Precipitition Comperison between Shang dynasty and Today at Anyang
   var iDestRow=1;  //starting row for calc.

   //copy src table data into destination table.
   //table rain freq
  cpySrc2DestTable(   "#RainFreqTable", 62, 1, 15,   DestTableID, iDestRow+1, 1);
  cpySrc2DestTable(   "#RainFreqTable", 63, 1, 15,   DestTableID, iDestRow+2, 1);
  cpySrc2DestTable(   "#RainFreqTable", 64, 1, 15,   DestTableID, iDestRow+3, 1);

  //table day-months
  cpySrc2DestTable(   "#MonthDayTable", 62, 1, 15,   DestTableID, iDestRow+4, 1);
  cpySrc2DestTable(   "#MonthDayTable", 63, 1, 15,   DestTableID, iDestRow+5, 1);
  cpySrc2DestTable(   "#MonthDayTable", 64, 1, 15,   DestTableID, iDestRow+6, 1);

  //climate table ClimateDataAnyang
  cpySrc2DestTable(   "#ClimateDataAnyang", 4, 3, 11,   DestTableID,  iDestRow+14, 1);
  cpySrc2DestTable(   "#ClimateDataAnyang", 4, 0, 2,   DestTableID,  iDestRow+14, 10);
  cpySrc2DestTable(   "#ClimateDataAnyang", 1, 3, 11,   DestTableID,  iDestRow+15, 1);
  cpySrc2DestTable(   "#ClimateDataAnyang", 1, 0, 2,   DestTableID,  iDestRow+15, 10);

//make calculation on destination table.  RainFreqCalc
calcRate(DestTableID, iDestRow+1,1,14,   3,   iDestRow+7, -1);
calcRate(DestTableID, iDestRow+2,1,14,   3,   iDestRow+8, -1);
calcRate(DestTableID, iDestRow+3,1,14,   3,   iDestRow+9, -1);


calcRate(DestTableID, iDestRow+1,1,14,   3,   iDestRow+10,  15);
calcRate(DestTableID, iDestRow+2,1,14,   3,   iDestRow+11,  15);
calcRate(DestTableID, iDestRow+3,1,14,   3,   iDestRow+12,  15);


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


//
//
////
//
// Table: Calculation of Propability of Numbers of Days For Each Month
var iT14month = calc_tot_in_row("#MonthDayTable", 64, 1,14);//2,15); 
$("#T14month").text( iT14month  );
var propability = 100 * 2 / parseFloat( iT14month ); 
$("#P14month").text( propability.toFixed(2)  );


var iT13month = calc_tot_in_row("#MonthDayTable", 64, 13,13);//14,14);
$("#T13month").text( iT13month );
propability = 100 * iT13month / parseFloat( iT14month ); 
$("#P13month").text( propability.toFixed(2)  );


var iTnormal = calc_tot_in_row("#MonthDayTable", 64, 1,12);//2,13);
$("#Tnormal ").text( iTnormal );
propability = 100 * iTnormal / 12.0 / parseFloat( iT14month ); 
$("#Pnormal").text( propability.toFixed(2)  );




});//ready




function cpTableMatrx(srcTableIndx, srcRow, srcColStart, srcColEnd, destTableInx, destRow, destColStart){

  $("table:eq("+destTableInx+") tr:eq("+destRow+") td").each(function(i){
      var dlt = srcColStart - destColStart;
	 
      if( i >= destColStart && i <= srcColEnd - dlt ){
 
         var dat = $("table:eq("+srcTableIndx+") tr:eq("+srcRow+") td:eq(" + (dlt+i) + ")" ).text();
         $(this).text( dat );
      };
  });
}//////////cpTableMatrx

function cpySrc2DestTable(srcTableID, srcRow, srcColStart, srcColEnd, destTableID, destRow, destColStart){

  $( destTableID +" tr:eq("+destRow+") td").each(function(i){
      var dlt = srcColStart - destColStart;
	 
      if( i >= destColStart && i <= srcColEnd - dlt ){
 
         var dat = $(srcTableID+" tr:eq("+srcRow+") td:eq(" + (dlt+i) + ")" ).text();
         $(this).text( dat );
      };
  });
}//////////cpTableMatrx


function calcRate(srcTableIndx, srcRow, srcColStart, srcColEnd, srcRowOffset, destRow,  iUseZhenMonthCol){

  $(srcTableIndx+" tr:eq("+srcRow+") td").each(function(i){

	 
      if( i >= srcColStart && i <= srcColEnd ){
 
         var dat1 = $(srcTableIndx+" tr:eq("+srcRow+") td:eq(" + (i) + ")" ).text();
         var dat2 = $(srcTableIndx+" tr:eq("+(srcRow+srcRowOffset)+") td:eq(" + (i) + ")" ).text();

         var rate = parseFloat(dat1 ) / parseFloat(dat2 )  * 100  ;
         if ( iUseZhenMonthCol  > 0   &&  srcColStart  ==  i ) {
                    var ZhenMonth1 = $(srcTableIndx+" tr:eq("+(srcRow)+") td:eq(" + ( iUseZhenMonthCol  ) + ")" ).text();
                    var ZhenMonth2 = $(srcTableIndx+" tr:eq("+(srcRow+srcRowOffset)+") td:eq(" + ( iUseZhenMonthCol  ) + ")" ).text();
                    rate = (parseFloat(ZhenMonth1) + parseFloat(dat1) )  / (parseFloat(dat2 ) + parseFloat(ZhenMonth2 ))  * 100  ;
         }

         $(srcTableIndx+" tr:eq("+(destRow)+") td:eq(" + (i) + ")" ).text(rate.toFixed(2) );
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