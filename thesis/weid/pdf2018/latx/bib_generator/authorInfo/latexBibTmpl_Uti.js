var authorInfo=[];
var authorInfo_Arr=[];//defined in _000.js
function authorInfo_Arr_Merge(){
	$.each(authorInfo_Arr,function(i, arr){
		$.each(arr,function(j,obj){
			authorInfo.push(obj);
		});
	});
}


var tmpl_man={   
            "name":"-",
            "names":"-",
            "namet":"-",
            "namep":"-",
            "life":"0000-0000",
            "web":[  
               {  
                  "url":"txt"
               }
            ]
         };

//in file:  latexBibTmpl_InputTable=


var latexBibTmpl_Standard=JSON.parse(JSON.stringify(latexBibTmpl_InputTable));

var none_std_key_arr=["urla","urlb","mynotes", "mylink"];
$.each(none_std_key_arr,function(i, strKey){
	delete latexBibTmpl_Standard[strKey];//remove key
});


var Tmp_authorInfo=
{
	"man":[
		tmpl_man
    ],
    "bib":[
    	latexBibTmpl_InputTable
    ]
};




var PubTypeBibLatexRequiredFilds={
"article"		:["author", "title", "journal", "year"],
"book"			:["author|editor", "title", "publisher", "year"],
"booklet"		:["title"],
"conference"	:["title", "year"],
"inbook"		:["author","editor", "title", "chapter", "pages", "publisher", "year"],
"incollection"	:["author", "title", "booktitle", "publisher", "year"],
"inproceedings"	:["author", "title", "booktitle", "year"],
"manual"		:["title"],
"mastersthesis"	:["author", "title", "school", "year", "type"],
"misc"          :["author", "title"],
"phdthesis"		:["author", "title", "school", "year", "type"],
"proceedings"	:["title", "year"],
"techreport"	:["author", "title", "institution", "year"],
"unpublished"	:["author", "title", "note"],
"webpage"       :["author", "title", "url", "Urldate"]
};



///DongZuoBing Chronicle Index.
var dzbChronicleYear2Indx=
[
{1903:[1,1]},         
{1904:[2,2]},
{1905:[3,3]},
{1906:[4,4]},
{1907:[]},
{1908:[]},
{1909:[5,5]},
{1910:[6,7]},
{1911:[8,11]},
{1912:[12,13]},
{1913:[14,17]},
{1914:[18,19]},
{1915:[20,24]},
{1916:[25,28]},
{1917:[29,41]},
{1918:[42,42]},
{1919:[43,51]},
{1920:[52,58]},
{1921:[59,62]},
{1922:[63,65]},
{1923:[66,72]},
{1924:[73,77]},
{1925:[78,87]},
{1926:[88,91]},
{1927:[92,100]},
{1928:[101,115]},
{1929:[116,135]},
{1930:[136,165]},
{1931:[166,182]},
{1932:[183,209]},
{1933:[210,243]},
{1934:[244,282]},
{1935:[283,319]},
{1936:[320,333]},
];
function GetYearOfIndex(idx){
	var yr=idx;
	$.each(dzbChronicleYear2Indx, function(j,obj){
		$.each(obj,function(iyear,range){
			for(var k=range[0]; k<=range[1]; k++){
				if(k==idx){
					yr=iyear;
				}
			}
		});
	});
	return yr;
}






























