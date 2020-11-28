$(document).ready(function(){

 //alert( $("table:eq(0) tr:first-child td:eq("+10+ ")").text() );


  $("table:eq(5) tr:eq(1) td").each(function(i){
      if( i > 0 && i <16 ){
         //var dat = $("table:eq(0) tr:eq(62) td:eq("+ (1+i) + ")").text();
         //$(this).text( dat );
      };
  });


////////////////////////////////////////////////////////////////

graphic_Rain_Freq();

graphic_Days_Distribution();

graphic_Days_Activities();
///////////////////////////////////////////////////////////

});//ready



function graphic_Rain_Freq(){
	var DestTableID="#RainFreqCalc";
	var rowIdx=13;
	var tds = $(DestTableID+" tr:eq("+rowIdx+") td");
	var arr=[];
	var arr2shift=new Array(13);
	arr2shift[0]=0;
	$.each(tds,function(i){
			 var sval = $(this).html();
			 var ival = parseInt(sval);
			 arr.push(ival);
			 
			 if(i>=1 && i<13){
				 var j=(i+3) % 13;
				 if(j>=0 && j<=3) j=j+1;
				 arr2shift[j]=ival;
				 //alert(j);
			 }
		});
    tds = $("#ClimateDataAnyang tr:eq("+5+") td");
	var arrAnyang=[];
	arrAnyang[0]=0;
	$.each(tds,function(i){
			 var sval = $(this).html();
			 var ival = parseInt(sval);
			 arrAnyang.push(ival);
			 //alert(ival);
		});		
	
	
	///////////////////////////Canvas Days Distributions//////////////////////
	var t2g= new Table2Graphic("myCanvas1");
    t2g.set_origin({xShift:60,yShift:40});
    t2g.set_units({xSize:12,yMax:20});
   
    t2g.draw_xSteps({xSteps:1, label:true, firstIdx:0, firstVal:""});
    t2g.vertText( {text:"Avg. Precipitation or Rain Freq.",x:30,y:50} );
	t2g.horzText( {text:"Months",x:0,y:0} );
        
    t2g.draw_yGgrid({ySplitSize:5});


    t2g.draw_curvLine(arr,{iStart:1, colr:"#ff0000",slabel:"2",xlabel:20,ylabel:-15} );
    t2g.draw_curvLine(arr2shift,{iStart:1, colr:"#00ff00",slabel:"3",xlabel:5,ylabel:-5} );
    t2g.draw_curvLine(arrAnyang,{iStart:1, colr:"#0000ff",slabel:"1",xlabel:10,ylabel:10} );
}
function graphic_Days_Distribution(){
	///////////////////////////Canvas Days Distributions//////////////////////
	var t2g= new Table2Graphic("myCanvasDaysDistributions");
    t2g.set_origin({xShift:60,yShift:40});
    t2g.set_units({xSize:14,yMax:20});
   
    t2g.draw_xSteps({xSteps:1, label:true, firstIdx:0, firstVal:""});
    t2g.vertText( {text:"Number of Days in a Month (unit:100)",x:30,y:50} );
	t2g.horzText( {text:"Months",x:0,y:0} );
        
    t2g.draw_yGgrid({ySplitSize:10});

    var arr=[];
	arr = getArrFromMonthDayTable_Tm(0);
    t2g.draw_curvLine(arr,{iStart:1, colr:"#ff0000",slabel:"Tm1",xlabel:20,ylabel:29} );
	
	arr = getArrFromMonthDayTable_Tm(1);
    t2g.draw_curvLine(arr,{iStart:1, colr:"#00ff00",slabel:"Tm0",xlabel:50,ylabel:5} );
	
	arr = getArrFromMonthDayTable_Tm(2);
    t2g.draw_curvLine(arr,{iStart:1, colr:"#0000ff",slabel:"Tm",xlabel:10,ylabel:10} );
}
function graphic_Days_Activities(){
	///////////////////////////Canvas Days Distributions//////////////////////
    var t2g= new Table2Graphic("myCanvas60DaysActivities");
    t2g.set_origin({xShift:60,yShift:40});
    t2g.set_units({xSize:60,yMax:300});
	
    t2g.draw_xSteps({xSteps:1} );
    t2g.draw_xSteps({xSteps:10, label:true, firstIdx:0, firstVal:"1"});
    t2g.vertText( {text:"Daily Activity Number (unit:50)",x:30,y:80} );
	t2g.horzText( {text:"Sexagenary  Days",x:0,y:0} );
        
    t2g.draw_yGgrid({ySplitSize:6});

    var arr=[];
	
	var arr1 = getArrFromMonthDayTable_Tn(0);
	var arr0 = getArrFromMonthDayTable_Tn(1);
	var arr = getArrFromMonthDayTable_Tn(2);
	//t2g.set_yMax( arry(arr1,arr0,arr) );
    t2g.draw_curvLine(arr1,{iStart:1, colr:"#ff0000",slabel:"Tn1",xlabel:20,ylabel:29} );
    t2g.draw_curvLine(arr0,{iStart:1, colr:"#00ff00",slabel:"Tn0",xlabel:50,ylabel:5} );
    t2g.draw_curvLine(arr,{iStart:1, colr:"#0000ff",slabel:"Tn",xlabel:10,ylabel:10} );
}
function getArrFromMonthDayTable_Tn(iTn){
    iTn += 29;//td:eq("+iTn+")
    var trs = $("#MonthDayTable tr ");
    var arr=[];
    arr.push(0);//empy
    $.each(trs,function(i){
             var sval = $(this).find("td:eq("+iTn+")");         
             if(i>=2){
                var ival = parseInt(sval.text()) / 1;
                arr.push(ival);
                console.log(ival);
             }
        });
        //
     return arr;
}

function gridCordination(ctx, xWidth,yHeight, xUnit,yUnit, xShift,yShift, xSplitSize){
    var y0=yHeight-yShift;

    ctx.beginPath();
    ctx.strokeStyle = '#eeeeee';
    ctx.moveTo(0,y0);
    ctx.lineTo(xWidth,y0);
    for(var i=1;i<xSplitSize;i++){

        //vert lines
        ctx.moveTo(i*xUnit+xShift,0);
        ctx.lineTo(i*xUnit+xShift,y0);
        
        //vert lables 
        var syUnit=i;
        //if(i==12) sxUnit=i+"(months)";
        if(i==0) syUnit="";
        //ctx.fillText(syUnit, xShift+25, y0-yUnit*i*3);
        
        //horz lines
        //ctx.moveTo(xUnit+xShift,y0-yUnit*i*3);
        //ctx.lineTo(xWidth,y0-yUnit*i*3);
        
        //horz labels
        var sxUnit=i;
        //if(i==12) sxUnit=i+"(months)";
        if(i==0) sxUnit="";
        //ctx.fillText(sxUnit, i*xUnit+xShift-2, yHeight-yShift+10);
    }
	ctx.stroke();
}

function gridCordinator_Labels(ctx, xWidth,yHeight, xShift,yShift, xGridUnit, yGridUnit,xSplitSize,ySplitSize){
    var y0=yHeight-yShift;
	
	////////////////////////////////////
	ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    ctx.moveTo(0,y0);
    ctx.lineTo(xWidth,y0);
	

	// |||||
	var xUnit=(xWidth-xShift)/xSplitSize; //grid unit x.
    for(var i=0;i<=xSplitSize;i++){

        //vert lines
        ctx.moveTo(i*xUnit+xShift,0);
        ctx.lineTo(i*xUnit+xShift,y0);
        
        //horz line labels
        var sxUnit=""+i*xGridUnit;
        //if(i==12) sxUnit=i+"(months)";
              
        var aAdj = 3* (sxUnit.length);
        if(i==0) {
            sxUnit="1";  
            aAdj -= 10;
        }
        ctx.fillText(sxUnit, i*xUnit+xShift-aAdj, yHeight-yShift+10);
    }
	ctx.stroke();	
	
	ctx.beginPath();
    ctx.strokeStyle = '#ff0000';
    ctx.moveTo(0,y0);
    ctx.lineTo(xWidth,y0);
	

	// =
	// =
	ctx.beginPath();
	ctx.strokeStyle = '#ff0000';
	var yUnit=(yHeight-yShift)/ySplitSize; //grid unit y.
    for(var i=0;i<=ySplitSize;i++){
		
         //horz lines
		var y=y0-yUnit*i;
        ctx.moveTo(xShift, y);
        ctx.lineTo(xWidth, y);    

		
        //y lables 
        var syUnit=""+i*yGridUnit;
		var xAdj= 6 * syUnit.length;
        //if(i==12) sxUnit=i+"(months)";
        if(i==0) syUnit="";
        ctx.fillText(syUnit, xShift-xAdj, y);
        
    }
	ctx.stroke();	
}
function gridCordination_horz_vert_labels(ctx, xWidth,yHeight, xUnit,yUnit, xShift,yShift, xSplitSize){
    var y0=yHeight-yShift;

    ctx.beginPath();
    ctx.strokeStyle = '#cccccc';
    ctx.moveTo(0,y0);
    ctx.lineTo(xWidth,y0);
    for(var i=1;i<xSplitSize;i++){

        //vert lables 
        var syUnit=i;
        //if(i==12) sxUnit=i+"(months)";
        if(i==0) syUnit="";
        ctx.fillText(syUnit, xShift+25, y0-yUnit*i*3);
        
        //horz labels
        var sxUnit=i;
        //if(i==12) sxUnit=i+"(months)";
        if(i==0) sxUnit="";
        ctx.fillText(sxUnit, i*xUnit+xShift-2, yHeight-yShift+10);
    }
	ctx.stroke();
}
function vertText(ctx, yHeight, str, x, y){
    ////rotate text
    ctx.beginPath();
    ctx.save();
    ctx.translate(0, yHeight);  
    ctx.rotate( (-Math.PI / 2));
    ctx.fillText(str, y,x);    
    ctx.restore();
    ctx.stroke();
}

function getArrFromMonthDayTable_Tm(iTm){
    iTm += 62;
    var tds = $("#MonthDayTable tr:eq("+iTm+") td");
    var arr=[];
    arr.push(0);//empy
    $.each(tds,function(i){
             var sval = $(this).text();         
             if(i>=1){
                var ival = parseInt(sval) / 50;
                arr.push(ival);
                //alert(ival);
                }
        });
        //
     arr[1] += arr[15];//ajusted by Zhen Month.
     return arr;
}

function drawCurvLine(ctx,xUnit,yUnit, xOff, yOff, colr, xlabel, ylabel, slabel, arr, iStop){
	ctx.beginPath();
	ctx.strokeStyle = colr;
	ctx.fillText(slabel, xUnit+xlabel+xOff, yOff - yUnit * arr[1]+ylabel);
	ctx.moveTo(xUnit+xOff, yOff - yUnit * arr[1]);
	$.each(arr,function(i,ival){
		
		 //var sval = $(this).val();
		 //var ival = parseInt(sval);
		 //alert("=="+sval);
		 if( i>=1 && i<=iStop && ival ){ 
			ctx.lineTo((i)*xUnit+xOff, yOff-yUnit*ival);
		 }
	});
	ctx.stroke();
}




function Table2Graphic(canvasID) {
    if(!canvasID) alert("JsxmlsGenerator canvasID can not be null");
    this.canvasID= canvasID;
    var c=document.getElementById(canvasID);
    this.ctx=c.getContext("2d");
    this.xWidth=$("#"+canvasID).attr("width");
    this.yHeight=$("#"+canvasID).attr("height");
    
    this.xMargine=30;
    this.yMargine=10;
};

Table2Graphic.prototype.set_origin=function (parms){
    this.xShift= parms.xShift;
    this.yShift= parms.yShift;
    this.y0=this.yHeight - parms.yShift;
    
    this.x0=this.xShift;
    
    this.width = this.xWidth - this.xShift - this.xMargine;
    this.height = this.yHeight - this.yShift - this.yMargine;
    
    this.draw_layout();
}
Table2Graphic.prototype.draw_layout=function (parms){
    this.ctx.beginPath();
	this.ctx.strokeStyle = '#cccccc';
    
    var x=this.xShift;
    var y=this.yMargine;
    var w=this.width;
    var h=this.height;
    
    this.ctx.rect(x,y,w,h); 
	this.ctx.stroke();	
}
Table2Graphic.prototype.set_units=function (parms){
    this.xSize =  parms.xSize ;
    this.xUnit = Math.round( this.width / parms.xSize );
    
    this.yFactor =   this.height /parms.yMax ;
    this.yMax =  parms.yMax;
}
Table2Graphic.prototype.set_yMax=function (arr){
    var yMax=this.yMax;
	$.each(arr, function(i,v){
		if(v>yMax) {
			yMax=v;
		}
	});
	
    this.yFactor =  yMax / this.height ;
}

Table2Graphic.prototype.draw_xSteps=function (parms){
	this.ctx.beginPath();
    this.ctx.strokeStyle = '#eeeeee';
    if(parms.label==true){
        this.ctx.strokeStyle = '#cccccc';
    }    
    if(parms.colr){
        this.ctx.strokeStyle  = parms.colr;
    }

    
	// |||||
	var xUnit=this.xUnit;//(this.xWidth-this.xShift)/parms.xSplitSize; //grid unit x.
    for(var i=0;i<=this.xSize;i+=parms.xSteps){
        //vert lines
        this.ctx.moveTo(i*xUnit+this.xShift, this.yMargine);
        this.ctx.lineTo(i*xUnit+this.xShift,this.y0);
        
        if(parms.label==true){
            var sxUnit=""+i;
            var aAdj = 3* (sxUnit.length);
            if(i==parms.firstIdx) {
                sxUnit=parms.firstVal;  
                aAdj -= 10;
            }
            this.ctx.fillText(sxUnit, i*xUnit+this.xShift-aAdj, this.yHeight-this.yShift+10);
        }
    }
	this.ctx.stroke();	
}


Table2Graphic.prototype.draw_yGgrid=function (parms){
	this.ctx.beginPath();
	this.ctx.strokeStyle = '#cccccc';
	var yUnit=(this.height)/parms.ySplitSize; //grid unit y.
    for(var i=0;i<=parms.ySplitSize;i++){
		
         //horz lines
		var y=this.y0-yUnit*i;
        this.ctx.moveTo(this.xShift, y);
        this.ctx.lineTo(this.xWidth-this.xMargine, y);    

		
        //y lables 
        var syUnit=""+ Math.round(i);//* this.yFactor);
		var xAdj= 6 * syUnit.length;
        //if(i==12) sxUnit=i+"(months)";
        if(i==0) syUnit="";
        this.ctx.fillText(syUnit, this.xShift-xAdj, y);
        
    }
	this.ctx.stroke();	
}


Table2Graphic.prototype.horzText=function ( parms ){
    ////rotate text
	var x=this.xShift + this.width/2 - parms.text.length*6/2 + parms.x;
	var y= this.y0 + parms.y + 30;
    this.ctx.beginPath();
    this.ctx.fillText(parms.text, x, y);    
    this.ctx.stroke();
}
Table2Graphic.prototype.vertText=function ( parms ){
    ////rotate text
    this.ctx.beginPath();
    this.ctx.save();
    this.ctx.translate(0, this.yHeight);  
    this.ctx.rotate( (-Math.PI / 2));
    this.ctx.fillText(parms.text, parms.y,parms.x);    
    this.ctx.restore();
    this.ctx.stroke();
}
Table2Graphic.prototype.draw_curvLine=function(arr,  parms ){
	var xUnit=this.xUnit;	
	var yUnit=this.yFactor;
	var xoff = this.xShift;
	var ctx=this.ctx;
	var y0=this.y0;	
	var xsize = this.xSize;
	
	ctx.beginPath();
	ctx.strokeStyle = parms.colr;
	
	ctx.fillText(parms.slabel, xUnit+xoff+parms.xlabel, y0 - yUnit * arr[1]+parms.ylabel);
	ctx.moveTo(xUnit+xoff,y0 - yUnit * arr[1]);

	var x,y;
	$.each(arr,function(i,ival){
			 x=0+i*xUnit+xoff;
			 y=Math.round(0+y0-yUnit*ival);		
			console.log(i+"===="+ival+",x="+x+",y="+y);
			if(i>=parms.iStart && i<=xsize){
				ctx.lineTo( x, y);
			}
		 //}
	});
	ctx.stroke();
}