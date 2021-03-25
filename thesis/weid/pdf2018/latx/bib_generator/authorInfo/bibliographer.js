<!DOCTYPE html>
<html>

<head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <title>biDesk</title>
    <base target="_blank" />
    <link href="" rel="stylesheet" type="text/css" />
    <script src="../../../_js/jquery.min.js"></script>
    <script src="../../../_js/jquery.tableindexer.js"></script>
    <script src="../../../_js/table_Indexer.js"></script>

    <script src="../../../_js/jquery.tablesorter.js"></script>

    <script src="./latexBibTmpl.js"></script>
    <script srcxxxxxxxxxxxxxxxxx="./bibDat/BibDat_OBI.json.js"></script>
    <script src="./authorInfo_Utils.js"></script>

    <script src="http://localhost:7778/Jsonpster/" src_test="http://104.188.182.128:7778/Jsonpster/"></script>


    <style type="text/css">
        #menu {
            position: fixed;
            top: 0;
            right: 10px;
            background-color: #cccc00;
        }

        #out {
            position: float;
            top: 20;
            right: 20px;
            background-color: #eeeeee;
            width: 100%;
            height: 500px;
        }

        .edi {
            border: 1px solid #ffff00;
            margin-left: 1px;
            width: 100%;
            min-width: 4px;
            background-color: #a4dbe1;
            font-size: 12pt;
        }

        .Required {
            background-color: #ff0000;
        }

        .popupped {
            border: 5px solid #0000ff;
            background-color: #cccc00;
        }

        caption {
            text-align: left;
            background-color: #aaaaaa;
        }

        select {
            width: 100%;
            font-size: 12px;
        }

        .hili {
            background-color: aqua;
        }

        .rowhi {
            background-color: #eeeeee;
        }

        th {
            background-color: #aaaaaa;
        }

        .fixedTitle {
            position: fixed;
        }

        .fxwd {
            width: 10px;
            font-size: 7px;
            overflow-wrap: break-word;
        }
    </style>

</head>

<script>
    $(document).ready(function () {
        //GenTable();
        $("table").click(function () {
            $("thead").addClass("fixedTitle");
            console.log("fixed")
        })
    });


    function GetSvcPathFileName(fname) {
        const svcDir = "../../../../../../bitbucket/wdingsoft/weid/pdf2018/latx/bib_generator/authorInfo/bibDat/";
        return svcDir + fname;
    }
    function select_bibDat(_this) {
        var fname = $(_this).val();
        fname = GetSvcPathFileName(fname);
        var param = { api: "LoadJsonFile", inp: { filename: fname } };
        ///////////////////
        Jsonpster.Run(param, function (ret) {
            GenTable(ret);
            var txt = Footnote(ret);
            txt += "\n\n===============\n"
            txt += Bibliography(ret);
            $("#out").val(txt);
        });
    }
    function Output_Footnotes() {
        var fname = "footnote_bibliography.json.js";
        fname = GetSvcPathFileName(fname);
        var param = { api: "LoadJsonFile", inp: { filename: fname } };
        ///////////////////
        Jsonpster.Run(param, function (ret) {
            var bibloAr = [];
            $.each(ret, function (key, obj) {
                var bibs = obj["biblio"];
                if (bibs.length > 10) {
                    bibloAr.push(obj["biblio"]);
                }
            });
            var txt = "";
            bibloAr.sort().forEach(function (v, i) {
                txt += "\n" + v + "\n";
            });
            txt += "\n\n===========\n\n";
            //var txt=bs+JSON.stringify(bibloAr,null,4);
            txt += JSON.stringify(ret, null, 4);
            $("#out").val(txt);
        });
    }


    /////////////////
    function get_latex_footnote_author(sauthor) {
        function Get_Last_First(sname) {
            var ret = "";
            if (sname.indexOf(",") < 0) {
                return sname;
            } else {
                var arr3 = sname.split(",");
                arr3.reverse();
                ret += arr3.join(" ");
            }
            return ret;
        }
        var ar = sauthor.split(/and/ig);
        var ret = "";
        const S_and = " and ";
        for (var i = 0; i < ar.length; i++) {
            ret += Get_Last_First(ar[i]) + S_and;
        }
        ret = ret.substr(0, ret.length - S_and.length);
        return ret;
    }
    function Footnote(dat) {
        var ftn = "";
        $.each(dat, function (k, obj) {
            if(!obj.author){
                console.error("obj no author", obj)
            }
            ftn += `\n\n[${k}]\n`;
            ftn += get_latex_footnote_author(obj.author);
            switch (obj.doctype) {
                case "article":
                    var month = "";
                    if (obj.month) month = obj.month + " ";
                    ftn += `, "${obj.title}" In: ${obj.journal} (${month}${obj.year})`;
                    break;
                case "mastersthesis":
                    ftn += `. ${obj.title} ${obj.type}, ${obj.school}, ${obj.year}`;
                    break;
                case "book":
                    ftn += `. ${obj.title}. ${obj.publisher}, ${obj.year}`;
                    break;
            }
        });
        return ftn;
    }
    function get_latex_bibliography_author(sauthor) {
        function Get_First_Last(sname) {
            var ret = "";
            if (sname.indexOf(",") >= 0) {
                return sname;
            } else {
                var arr3 = sname.split(" ");
                ret = arr3.pop() + ", ";
                ret += arr3.join(" ");
            }
            return ret;
        }
        var ar = sauthor.split(/and/ig);
        var ret = "";
        const S_and = " and ";
        for (var i = 0; i < ar.length; i++) {
            ret += Get_First_Last(ar[i]) + S_and;
        }
        ret = ret.substr(0, ret.length - S_and.length);
        return ret;
    }
    function Bibliography(dat) {
        var bibAr = [];
        $.each(dat, function (k, obj) {
            var ftn = "";
            ftn += get_latex_bibliography_author(obj.author) + ". ";
            switch (obj.doctype) {
                case "article":
                    var month = "";
                    if (obj.month) month = obj.month + " ";
                    ftn += `"${obj.title}." In: ${obj.journal} (${month}${obj.year})`;
                    break;
                case "mastersthesis":
                    ftn += `${obj.title}. ${obj.type}, ${obj.school}, ${obj.year}`;
                    break;
                case "book":
                    ftn += `. ${obj.title}. ${obj.publisher}, ${obj.year}`;
                    break;
            }
            bibAr.push(ftn);
        });
        bibAr.sort();
        var txt = "";
        for (var i = 0; i < bibAr.length; i++) {
            txt += "\n\n" + bibAr[i];
        }
        return txt;
    }
    /////////////////////////////////
    function GenTable(dat) {
        var tbs = GenTable_strn(dat, latexBibTmpl_InputTable);
        $("#taber").html(tbs).find("td").bind("click", function () {
            $(this).toggleClass("hili");
            $(this).parent().toggleClass("rowhi");
        });
        table_sort("#tabview");
        fixed_titles();
    }
    function GenTable_strn(dat, bibjsonObj) {
        function get_all_urls_ankors(obj) {
            var kys = Object.keys(obj);
            var ank = "";
            $.each(kys, function (i, kv) {
                var str = kv.toLowerCase();
                if (str.lastIndexOf("url") >= 0) {
                    if (ank.length > 0) ank += "<br>";
                    ank += `${str}=<a href='${obj[kv]}'>${obj[kv]}</a>`
                }
            });
            return ank;
        }
        var samp = {
            "doctype": "-",
            "author": "Ignatius",
            "title": "Bishop",
            "publisher": "-",
            "address": "Ignatius of Antioch",
            "year": "35-108",
            "abstract": "coined Catholic\nDie of tiger.",
            "annote": "",
            "mynotes": "",
            "RSS-description": "",
            "url": "url",

        };
        var titArr = Object.keys(samp);
        var titlestring = "<tr><th class='fxwd'>#</th><th>id</th>";
        var WidenArr = ["abstract", "annote", "mynotes"]
        const widener = "_________________________________";
        $.each(titArr, function (i, knm) {
            const blnks = "_________________________________"
            if (WidenArr.indexOf(knm) >= 0) knm = widener + knm + widener;
            titlestring += "<th>" + knm + "</th>";
        });
        titlestring += "</tr>";
        titlestring += titlestring;

        titlestring = `<thead>${titlestring}</thead>`;

        var tb = "<table border='1' class='bitxb' id='tabview'>";
        tb += `<caption>Single Bib Item Editor (tot=${Object.keys(dat).length})</caption>${titlestring}<tbody>`;
        var idx = 0;
        $.each(dat, function (k, obj) {
            tb += `<tr><td class='fxwd' >${(++idx)}</td><td class='fxwd'>${k}</td>`;
            $.each(titArr, function (i, knm) {
                var v = obj[knm];
                if (knm === "url") v = get_all_urls_ankors(obj);
                tb += "<td><a>" + v + "</a></td>";
            });
            tb += `</tr>`;
        });
        tb += "</tbody></table>";
        return tb;
    }
    function fixed_titles() {
        $("thead tr:eq(0)").addClass("fixedTitle");
        $("thead tr:eq(0)").find("th").each(function (i) {
            var w = $(`thead tr:eq(1) th:eq(${i})`).css("width");
            $(this).css("width", w);
        });

    }
</script>

<body>

    <div id="menu">

        <select id="SelBibDatFile" onchange="select_bibDat(this);" size='3'>
            <optgroup label="bibDat">
                <option value="BibDat_OBI.json.js">BibDat_OBI</option>
                <option value="BibDat_ZiZi.json.js">BibDat_ZiZi</option>
                <option value="ciu_reading.json.js">ciu_reading</option>
                <option value="pithy_quotes.json.js">pithy_quotes</option>
            </optgroup>
            <optgroup label="authors">
                <option value="AuthorsData_NTHistory.json.js">AuthorsData_NTHistory</option>
                <option value="AuthorsData_OBI.json.js">AuthorsData_OBI</option>
            </optgroup>
        </select>
        <a href="./bibDeskEditor.htm">bibDeskEditor</a>
        <a href="./bibFootnoteBibliography.htm">FootnoteBibliography</a>

        <button onclick="Output_Footnotes();">footnotes</button>
        <button onclick="Output_BibJson();"> </button>
        <button onclick="Output_BibLatex();"> </button>

        <button onclick="$('#out').val(JSON.stringify(authorInfo, null, 4)).select()[0].scrollIntoView();"> </button>

    </div>
    <p>.</p>
    <textarea id="out">ss</textarea>
    <div id="taber"></div>


    <hr>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <p>.</p>
    <script>
        $(function () {


        });


    </script>
</body>

</html>