

$(document).ready(function(){    

	

});


function GetValOfKeyIgnoreCase(obj,kIgnoreCase){
	var ret="";
	$.each(obj,function(k,v){
		if(k.toLowerCase()===kIgnoreCase.toLowerCase()){
			ret=v;
		}
	});
	return ret;
}
function authorInfo_GetUniqSortedVarr(opt, skey){
	var authorArr=[];
	$.each(authorInfo,function(i,authinf){
		$.each(authinf[opt],function(j,oj){
			var v=oj[skey];
			if( typeof v == "string" ){
				v=$.trim(v);
				if(v.length>0 && authorArr.indexOf(v)<0){
					authorArr.push(v);
				}		
			}
		});
	});

	authorArr.sort();
	return authorArr;
}
function authorInfo_GetSortedIdxVarr_by(opt, skey){
	var MAXLENNUM=10, MAXLENKEY=256;
	function padnum(i){
		var si=""+i;
		while(si.length<MAXLENNUM){si=" "+si;}
		return si;
	}
	function padkey(skey){
		var sret=$.trim(skey);
		while(sret.length<MAXLENKEY){sret+=" ";}
		return sret;
	}

	var sortedArr=[];
	$.each(authorInfo,function(i,authinf){
		$.each(authinf[opt],function(j,oj){
			var v=oj[skey];
			if( typeof v == "string" ){
				v=padkey(v)+padnum(i);
				if(v.length>0 && sortedArr.indexOf(v)<0){
					sortedArr.push(v);
				}		
			}
		});
	});

	
	sortedArr.sort();

	var idxArr=[];
	$.each(sortedArr,function(i, str){
		var sidx=str.substr(MAXLENKEY);
		var iidx=parseInt(sidx);
		idxArr.push(iidx);
	})
	return idxArr;
}









