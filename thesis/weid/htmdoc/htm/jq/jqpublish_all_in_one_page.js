$(document).ready(function(){
				
	onclick_prefix_pop_page();
    
    $("#dbg").click(function(){
        change_a_href_target_blank_and_check_exist();
    });
});








////for all in one only.
function onclick_prefix_pop_page(){
    $(".section_prefix, .appendix_prefix").click(function(){
        var url=$(this).attr("title");
        window.open(url, "_blank");
    });
    
}

	

function change_a_href_target_blank_and_check_exist(){
	$("#dbg").append("<hr/>change_a_href_target_blank_and_check_exist<br/>");
	var idx=0;
	$("a").each(function(){
		var shref = $(this).attr("href");	
		var txt = $(this).text();
		if(shref && shref.length>0){
			if("#" != shref[0]){
				idx++;
				var _TextExist_ = "_TextExist_"+idx;
				$(this).attr("target","_blank");
				
				var testlink="<a target='_blank' href='";
				testlink+=shref;
				testlink+="' id='"+ _TextExist_ + "' ";
				testlink+=">"+txt;
				testlink+="<br/>"+shref+"</a>";
				
				$("#dbg").append("["+idx +"] "+testlink+"<br/>");	
				
				
				//detect url existance
				$.ajax({
					type: 'HEAD',
					url: shref,					
					success: function() {
							// page exists
							$("#"+_TextExist_).html("ok all in 1");
					},
					error: function(err) {
							// page does not exist
							$("#"+_TextExist_).css("color","red").append("{"+ err+ "}");
					}
				});


				
			}

		}
	});
	
	//check_all_img();
}


function check_all_img(){
	$("#dbg").append("<hr/>check_all_img:<br/>");
	var idx=0;
	$("img").each(function(){
		var shref = $(this).attr("src");	
		if(shref && shref.length>0){
			if("#" != shref[0]){
				idx++;
				
				var testlink="<img src='";
				testlink+=shref;
				testlink+="'>"+shref+"</img>";
				
				$("#dbg").append("["+idx +"] "+testlink+"<br/>");				
			}

		}
	});
}









