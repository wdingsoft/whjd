
$(document).ready(function(){   

	show_all_verses();
	for(var i=1; i<=5; i++){
		var k=counter_col(i);
		console.log(k);
	}
 
});

function counter_col(colID){
	var sfid="td:eq("+colID+")";
	var count=0;
	$("#maintable tbody tr").each(function(){
		var std=$(this).find(sfid).text();
		std=$.trim(std);
		if(std.length>0){
			count++;
		}
	});

	$("#maintable tbody tr:eq(1) td:eq("+colID+")").text(-1+count);
	return count;
}

function show_all_verses(){
	var sret="";
	var colID=1;
	var sfid="td:eq("+colID+")";
	var count=0;
	$("#maintable tbody tr").each(function(){
		var std=$(this).find(sfid).text();
		std=$.trim(std);
		if(std.length>0){
			count++;
			sret+=std+";";
		}
	});
	$("#out").text(sret);
	//$("#maintable tbody tr:eq(1) td:eq("+colID+")").text(-1+count);
	return count;
}