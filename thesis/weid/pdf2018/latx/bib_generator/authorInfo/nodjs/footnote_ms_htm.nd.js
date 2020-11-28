//var request = require("request");
const fs = require('fs');
var path = require('path');
var Uti = require("../../../../../../utis/zfrqCalc/Uti.Module").Uti;

//var a=require("../latexBibTmpl");
//const bibTmp = Uti.LoadObj("../latexBibTmpl.js");
//const latexBibTmpl_InputTable = bibTmp.obj;
//console.log(bibTmp);


function get_footnote_author(sauthor) {
    sauthor = sauthor.trim();
    function Get_Last_First(sname) {
        sname = sname.trim(" ");
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
    ret = ret.trim();
    return ret;
}
function get_footnote(obj) {
    var ftn = get_footnote_author(obj.author);
    switch (obj.doctype) {
        case "article":
            var month = "";
            if (obj.month) month = obj.month + " ";
            ftn += `, "${obj.title}" In: ${obj.journal} (${obj.year})`;
            break;
        case "mastersthesis":
            ftn += `. "${obj.title}" Master Thesis, ${obj.school}, ${obj.year}`;
            break;
        case "phdthesis":
            ftn += `. "${obj.title}" PhD Thesis, ${obj.school}, ${obj.year}`;
            break;
        case "book":
            ftn += `. ${obj.title}. Ed. ${obj.publisher}, ${obj.year}`;
            break;
        case "incollection":
            ftn += `. "${obj.title}" In: ${obj.booktitle}. Ed. by ${obj.editor}. ${obj.address}:${obj.publisher}, ${obj.year}`;
            break;
        case "webpage":
            ftn += `. "${obj.title}" ${obj.year}. URL:${obj.url} (visited on ${obj.Urldate} )`;
            break;
    };
    console.log(ftn);
    console.log();
    return ftn;
}



function get_bibliography_author(sauthor) {
    function Get_First_Last(sname) {
        var ret = "";
        if (sname.indexOf(",") >= 0) {//family and first ready.
            return sname;
        } else {
            sname = sname.trim(" ");
            var arr3 = sname.split(" ");
            if (arr3.length > 1) {
                arr3 = arr3.reverse();
                ret = arr3.shift() + ", ";
                ret += arr3.join(" ");
            } else {
                ret = sname;
            }

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
function get_bibliography(obj) {
    var ftn = get_bibliography_author(obj.author) + ". ";
    switch (obj.doctype) {
        case "article":
            var month = "";
            if (obj.month) month = obj.month + " ";
            ftn += `"${obj.title}." In: ${obj.journal} (${month}${obj.year})`;
            break;
        case "mastersthesis":
            ftn += `${obj.title}. Master Thesis, ${obj.school}, ${obj.year}`;
            break;
        case "phdthesis":
            ftn += `${obj.title}. PhD Thesis, ${obj.school}, ${obj.year}`;
            break;
        case "book":
            ftn += `. ${obj.title}. ${obj.publisher}, ${obj.year}`;
            break;
        case "incollection":
            ftn += `. "${obj.title}" In: ${obj.booktitle}. Ed. by ${obj.editor}. ${obj.address}:${obj.publisher}, ${obj.year}`;
            break;
        case "webpage":
            ftn += `. "${obj.title}" ${obj.year}. URL:${obj.url} (visited on ${obj.Urldate} )`;
            break;
    }
    console.log(ftn);
    console.log();
    return ftn;
}



function jsdat2_footnote_biblio(retObj, jsfile) {
    var BibDatObj = Uti.LoadObj(jsfile);
    var arr = Object.keys(BibDatObj.obj);
    for (var i = 0; i < arr.length; i++) {
        var ks = arr[i];
        if (retObj[ks]) {
            console.log("\n******** Warn: Find Duplicated id key *******************");
            console.log(i, ks);
        }
        retObj[ks] = {
            footno: get_footnote(BibDatObj.obj[ks]),
            biblio: get_bibliography(BibDatObj.obj[ks])
        };
    }
    return retObj;
}
function gen_footno_biblio_Obj(jsfnameArr) {
    var footObj = {};
    jsfnameArr.forEach(function (jsfname) {
        jsdat2_footnote_biblio(footObj, jsfname);
    });
    return footObj;
}
function id2_footnote(usedbootObj, footObj, parm) {
    var txt = fs.readFileSync(parm.file, parm.utfcode);
    console.log(txt);

    Object.keys(footObj).forEach(function (key) {
        console.log(key);
        if (txt.indexOf(key) >= 0) {
            console.log(key, footObj[key].footno);
            usedbootObj[key] = footObj[key];
        }
        var regex2 = new RegExp(key, "g");
        txt = txt.replace(regex2, footObj[key].footno);
    });
    //console.log(txt);

    printout_sorted_bibliography(usedbootObj, parm.file + "_bibliography.txt")

    //txt=txt.replace(parm.body,parm.body2);
    fs.writeFileSync(parm.file + "_footnote.htm", txt, parm.utfcode);
}

function find_uid_of_line(line, footObj) {
    var ret = [];
    Object.keys(footObj).forEach(function (key) {
        if (line.indexOf(key) >= 0) {
            ret.push(key);
        }
    });
    return ret;
}
function id2_Ibid_footnote(usedbootObj, footObj, parm) {
    var txt = fs.readFileSync(parm.file, parm.utfcode);
    var lines = txt.split(/\r\n/g);

    //console.log(lines);
    var prevUID = "";
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var uidArr = find_uid_of_line(line, footObj);
        if (uidArr.length === 1) {
            var uid = uidArr[0];
            if (uid === prevUID) {
                lines[i] = line.replace(uid, "Ibid.");
            } else {
                prevUID = uid;
                lines[i] = line.replace(uid, footObj[uid].footno);
                usedbootObj[uid] = footObj[uid];
            }
        } else if (uidArr.length > 1) {
            console.error("***************** WARNING: muliple keys ************************\n", line);
            console.log(uidArr);
        }
    };

    printout_sorted_bibliography(usedbootObj, parm.file + "_bibliography.txt")

    //txt=txt.replace(parm.body,parm.body2);
    fs.writeFileSync(parm.file + "_footnote.htm", lines.join("\r\n"), parm.utfcode);
}



function printout_sorted_bibliography(usedfootObj, outfname) {
    var bibAr = [];
    Object.keys(usedfootObj).forEach(function (key) {
        bibAr.push(usedfootObj[key].biblio);
    });
    bibAr.sort();
    var txt = "";//JSON.stringify(bibAr, null, 4);
    for (var i = 0; i < bibAr.length; i++) {
        txt += "\n" + bibAr[i] + "\n";
    }
    fs.writeFileSync(outfname, txt, "utf8");
}




////////////////////////////////////////////////////////////////////////////////////
////
////
////
////
////
////////////////////////////////////////////////////////////////////////////////////

var inBibDat_Json_File =
    [
        "../bibDat/BibDat_OBI.json.js",
        "../bibDat/BibDat_ZiZi.json.js",
        "../bibDat/ciu_reading.json.js"
    ];
var footbibliObj = gen_footno_biblio_Obj(inBibDat_Json_File);

var output_json_file = "../bibDat/footnote_bibliography.json.js";
fs.writeFileSync(output_json_file, "var footnote_bibliography=\n"+JSON.stringify(footbibliObj, null, 4));



var usedfootObj = {};

var parm = {};

//require("../../../../../ms_h2d/master_thesis/review_prev_research/footnotes01.html")
parm.file = "../../../../../ms_h2d/master_thesis/review_prev_research/footnotes01.html";
parm.utfcode = "utf16le";
parm.body = "style='tab-interval:.5in'";
parm.body2 = "style='tab-interval:.5in;background-color:blue;'";
id2_Ibid_footnote(usedfootObj, footbibliObj, parm);


//require("../../../../../ms_h2d/master_thesis/review_prev_research/chapter_3_methodology01.html")
parm.file = "../../../../../ms_h2d/master_thesis/review_prev_research/chapter_3_methodology01.html";
parm.utfcode = "utf16le";//utf16le, utf8
parm.body = "style='tab-interval:.5in'";
parm.body2 = "style='tab-interval:.5in;background-color:blue;'";
id2_Ibid_footnote(usedfootObj, footbibliObj, parm);

