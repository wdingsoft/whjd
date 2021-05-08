// Handy JavaScript to measure the size taken to render the supplied text;
// you can supply additional style information too if you have it.





var endnote_bibliography = {
    set: function (bPrint, eleID) {
        endnote_bibliography.load_bib(bPrint);
        endnote_bibliography.note_indexer(bPrint, eleID);
        endnote_bibliography.quote_filler(bPrint);
        endnote_bibliography.end_notes(bPrint);

        endnote_bibliography.gen_bibliography(bPrint);
    },
    load_bib: function (bPrint) {
        var path = "../../../../weid/pdf2018/latx/bib_generator/authorInfo/bibDat/";
        var fary = ["BibDat_ZiZi.json.js", "BibDat_OBI.json.js", "ciu_reading.json.js", "china_bio.json.js", "collected_news_bio.json.js", "BibDat_SonOfMan.json.js", "BibDat_FamilialVocab.json.js"];

        this.m_bibObj = {};
        for (var i = 0; i < fary.length; i++) {
            var f1 = path + fary[i];
            uti.gen_sjs(f1);
            var ret = this.hard_cpy(this.m_bibObj, BibDat);
            if (1 === ret) console.error(f1)
        }
    },
    hard_cpy: function (tarObj, srcobj) {
        var ret = 0;
        Object.keys(srcobj).forEach(function (key) {
            if (undefined === tarObj[key]) {
                tarObj[key] = JSON.parse(JSON.stringify(srcobj[key]));
            } else {
                console.error("Duplicate key bibid:", key);
                ret = 1
            }
        });
        return ret
    },
    note_indexer: function (bPrint, eleID) {
        if (!bPrint) {
            $("sup[title]").text("[]");
            return
        }
        if (!eleID) eleID = "body"
        var _THIS = this;
        _THIS.m_bib_IDary = [];
        _THIS.m_pgAry = [];
        $(eleID).find("sup[title]").each(function (i) {
            var anchor = `[${(1 + i)}]`;
            if (typeof window.event.getModifierState != "function" || window.event.getModifierState("CapsLock")) {
                anchor = `<a endnote="1" href="#endnote${1 + i}">[${(1 + i)}]</a>`;
            }
            $(this).html(anchor);
            var pg = $(this).attr("pg");
            if (undefined === pg) pg = "";
            _THIS.m_pgAry.push(pg);

            var tx = $(this).attr("title");
            _THIS.m_bib_IDary.push(tx);
        });

    },
    quote_filler: function (bPrint) {
        if (!bPrint) {
            $("a[q][title]").text(`"..."`);
            return
        }
        var _THIS = this;
        $("a[q][title]").each(function (i) {
            var bibid = $(this).next().attr("title");
            var qid = $(this).attr("title");
            var bibobj = _THIS.m_bibObj[bibid];
            var tx = bibobj.quotes[qid];
            $(this).text(`"${tx.trim()}"`);
        });

    },
    end_notes: function (bPrint) {
        if (!bPrint) {
            $("#EndNotes").next().html("end_notes");
            return;
        }
        var ss = "";//"<ul type='none'>";
        var prevBiid = "";
        for (var i = 0; i < this.m_bib_IDary.length; i++) {
            ss += `<br><a type='endnote' name='endnote${i + 1}'>&nbsp;&nbsp;&nbsp;&nbsp;<sup>${i + 1}</sup> `;
            var nid = this.m_bib_IDary[i];
            var pg = this.m_pgAry[i];
            if (pg.length > 0) {
                pg = ", " + pg;
            }
            if (prevBiid === nid) {
                ss += "Ibid" + pg;
                ss += "</a>"
                continue;
            }
            prevBiid = nid;
            var noteObj = this.m_bibObj[nid];
            if (!noteObj) {
                console.error("nid not exist:", nid)
            }
            ss += Bibliography_Endnote_Uti.get_footnote(noteObj);
            ss += pg;
            ss += "</a>";
        };
        //ss += "</ul>";
        $("#EndNotes").next().append(ss);
        $("#EndNotes").append("<br><br>end<hr/>")
    },



    gen_bibliography: function (bPrint) {
        if (!bPrint) {
            $("#Bibliograph").text(Bibliograph);
            return;
        }
        var bibAr = [];
        var _THIS = this;
        var uniqCheckObj = {};
        _THIS.m_bib_IDary.forEach(function (biid, i) {
            if (undefined !== uniqCheckObj[biid]) return;
            uniqCheckObj[biid] = 1;
            var biOj = _THIS.m_bibObj[biid];
            var bib = Bibliography_Endnote_Uti.get_bibliography(biOj);
            bibAr.push(bib);
        });
        bibAr.sort();
        var sol = "";// 
        for (var i = 0; i < bibAr.length; i++) {
            var bib = bibAr[i];
            sol += `<div type='bibliography_item' title='${i}'>${bib}</div><br><br>`;
        }

        $("#Bibliograph").append(sol);
        $("#Bibliograph").append("<br><br>End<hr/>")
    },

    print_all_content_for_editing: function (sDescp) {
        function get_content(obj) {

            var txt = ""
            txt += obj.abstract + "<br>"
            if (obj.quotes) {
                Object.keys(obj.quotes).forEach(function (key) {
                    txt += key + ":" + obj.quotes[key] + "<br>"
                })
            } else {
                console.log("no quote:", obj)
            }

            return txt;
        }
        var uniqCheckObj = {};
        var txt = ""
        var _THIS = this;
        _THIS.m_bib_IDary.forEach(function (biid, i) {
            if (undefined !== uniqCheckObj[biid]) return;
            uniqCheckObj[biid] = 1;
            var biOj = _THIS.m_bibObj[biid];
            txt += "<hr>" + biid;
            txt += "<hr>" + Bibliography_Endnote_Uti.get_footnote(biOj) + "<br>";
            txt += "<hr>" + Bibliography_Endnote_Uti.get_bibliography(biOj) + "<hr>";
            txt += get_content(biOj) + "<br>"
        });

        $("body").append(`<h1>start print:${sDescp}</h1><hr>`)
        $("body").append(txt)
    }
}
