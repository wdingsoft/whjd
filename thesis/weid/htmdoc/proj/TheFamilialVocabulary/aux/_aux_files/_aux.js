
function test() {

}
function gen_tab() {
    function _get_all_attributes() {
        var atrObj = {};
        $("#view").find("table, caption, tr, thead, tbody, tfoot,td,th").each(function () {
            $.each(this.attributes, function (i, attrib) {
                atrObj[attrib.name] = attrib.value;
            });

            $(this).removeAttr("style");
            $(this).removeAttr("class");

        });
        return atrObj;
    }

    var str = $("#inp").val();
    $("#view").append(str);

    var atrObj = _get_all_attributes();

    //remove all attributes;
    $("#view").find("*").each(function () {
        //$(this).css("background-color", "lightblue");
        var _THIS = this;
        Object.keys(atrObj).forEach(function (key, i) {
            $(_THIS).removeAttr(key);
        })
    });


    //show
    $("#out").val($("#view").html());
    Object.keys(atrObj).forEach(function (key, i) {
        $("#view").prepend(`${i}. <a>${key}</a><br>`);
    });

}

function gen_italics() {
    var str = $("#inp").val();
    var ar = str.split(/\s+/g);
    for (var i = 0; i < ar.length; i++) {
        var s = ar[i].trim();
        if (s.length === 0) continue;
        _aux_doc_dat.italics[s] = 0;
    }

    $("#out").val("var _aux_doc_dat=\n" + JSON.stringify(_aux_doc_dat, null, 4));
}


function load_file(file) {
    //var file = "./aux/_aux_files/eng_wordfrq/eng_word_frq.htm";
    if ($("#view").find("table").length === 0) {
        $("#view").load(file);
        return true;
    }
    return false;
}

function engWordFrq2json() {
    var tab = "./aux/_aux_files/eng_wordfrq/eng_word_frq.htm";
    if (!load_file(tab)) return;

    var p5oj = amat = {
        "parr": [
            {
                "title": "EngWordFrq",
                "range": {},
                "dar": []
            }
        ],
        "info": {
            "colorar": [],
            "PoS": [],
            "word": []
        }
    }
    var frqobj = {}, TotFrq = 0;

    $("#view").find("tr").each(function () {
        var obj = {};
        var rank = $(this).find("td:eq(0)").text();
        obj.word = $(this).find("td:eq(1)").text().trim();
        obj.PoS = $(this).find("td:eq(2)").text();
        obj.Freq = $(this).find("td:eq(3)").text();
        if (obj.word.length === 0) {
            return;
        }
        if (obj.word === "word/lemma") {
            return;
        }
        TotFrq += parseInt(obj.Freq);
        frqobj[obj.word] = obj;
        p5oj.parr[0].dar.push(parseInt(obj.Freq));
        p5oj.info["PoS"].push((obj.PoS));
        p5oj.info["word"].push((obj.word));
        p5oj.info["colorar"].push("red");
    });
    $("#out").val("var EngWordFrq=\n" + JSON.stringify(frqobj, null, 4));


    for (var i = 0; i < p5oj.parr[0].dar.length; i++) {
        p5oj.parr[0].dar[i] = 100000 * p5oj.parr[0].dar[i] / TotFrq;
    };
    p5oj.parr[0].dar = p5oj.parr[0].dar.slice(0, 500);

    if ($("#inp").val().trim().length === 0) {
        $("#inp").val("var p5oj=\n" + JSON.stringify(p5oj, null, 4));
    } else {

    }



}
function BibleSonStats() {
    var file = "./aux/_aux_files/BibleSonStats/blueletter.html";
    if ($("#view").find("table").length === 0) {
        $("#view").load(file);
        return true;
    }
    var obj={}
    $("#view").find("td").each(function(){
        var tx = $(this).text().trim();
        var mat = tx.match(/([a-zA-Z0-9]+)\s+[\(](\d+)[\)]/);
        if(mat){
            console.log(mat);
            obj[mat[1]]=parseInt(mat[2]);
        }
    });
    $("#out").val("var a="+JSON.stringify(obj,null,4));
}

function items_page_size() {
    var file = "./doc.html";
    if ( !document.m_isloaded_dochtm ) {
        document.m_isloaded_dochtm=true;
        $("#view").load(file);
        return confirm("run again to get json.");
    }
    var obj={};
    $("#view").find("*[pagesize]").each(function(){
        var tx = $(this).text().replace($(this).find("a[chpnum]").text(),"").trim().replace(/[\"\']/g,"");
        
        obj[tx]={};
        $(this).next().find("div[subpagesize]").each(function(){
            var sub = $(this).text().replace($(this).find("a[subpage_idx]").text(),"").replace(/[\"\']/g,"").trim();
            //var sub = $(this).text().trim().replace(/[\"\']/g,"");
            var initdat=$(this).attr("subpagesize");
            obj[tx][sub]=[parseFloat(initdat),0,0];
        });
    });
    $("#out").val("var _items_page_size="+JSON.stringify(obj,null,4));
}