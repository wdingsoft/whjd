// Handy JavaScript to measure the size taken to render the supplied text;
// you can supply additional style information too if you have it.
var MeasureTextWidth = {
    measureText: function (pText, pFontSize, pStyle) {
        var lDiv = document.createElement('div');

        document.body.appendChild(lDiv);

        if (pStyle != null) {
            lDiv.style = pStyle;
        }
        if (!pFontSize) pFontSize = 12;
        lDiv.style.fontSize = "" + pFontSize + "px";
        lDiv.style.position = "absolute";
        lDiv.style.left = -1000;
        lDiv.style.top = -1000;

        lDiv.innerHTML = pText;

        var lResult = {
            width: lDiv.clientWidth,
            height: lDiv.clientHeight
        };

        document.body.removeChild(lDiv);
        lDiv = null;

        return lResult;
    },
    toFixedWidth: function (txt, spad, max) {
        var ret = this.measureText(txt, 12, 100);
        while (ret.width < max) {
            txt += spad;
            ret = this.measureText(txt, 12, 100);
        }
        return txt;
    }
}
var uti = {
    gen_sjs: function (jsf) {
        var scp = document.createElement("script")
        scp.src = jsf
        console.log("load:", jsf);
        $("head").append(scp);
        return ;
    },
    clear_sjs: function () {
        $("script[desc='addon'").remove();
    },
    webpage_format: function () {
        Load_Links.start(true);
        end_note_app.set(true);
        var iconifg = table_of_content.set(true);
        list_of_illustration.set(iconifg);
    }
}








$(function () {

    escap_uti.init();

    ol_type_set();

    edit_event_control();


    var jsfile = "./doc_files/d_em_key_words/items_page_size_json.js";
    table_of_content.InitIndex(jsfile);

    escap_uti.esc_keydown();
    uti.webpage_format();
});

var Load_Links = {
    start: function (b) {
        Load_Links.load_images(b);
        Load_Links.load_tables(b);
    },

    load_tables: function (b) {
        if (b) {//load
            $("a[title]").each(function () {
                var hrf = $(this).attr("title");
                if (hrf[0] === "#") {
                    $(this).attr("href", hrf);
                    return;
                }
                ////////////////
                if (!!hrf && hrf[0] === "." && hrf.indexOf(".html") > 0) {
                    console.log("load:", hrf);
                    $(this).load(hrf);
                    $(this).removeAttr("href");
                }
            });
        } else { //false:unload 
            $("a[title]").each(function () {
                var hrf = $(this).attr("title");
                if (hrf[0] === "#") {
                    $(this).removeAttr("href");
                    return;
                }
                //////////////////
                if (!!hrf && hrf[0] === "." && hrf.indexOf(".html") > 0) {
                    console.log("unload:", hrf);
                    $(this).empty();
                }
            });
        }
    },
    load_images: function (b) {
        if (b) {//load
            $("img[title]").each(function () {
                var hrf = $(this).attr("title");
                console.log("load:", hrf);
                $(this).attr("src", hrf);
            });
        } else { //false:unload 
            $("img[title]").removeAttr("src");
        }
    }
}


function edit_event_control() {
    $("h3, h4").click(function () {
        escap_uti.removeDirt();
        if (escap_uti.isEventOnly()) {
            var tag = $(this).prop("tagName");
            console.log("1", tag);
            if (tag[0] === "H") {
                $(this).next().slideToggle();
            };
        }
    });
    $("figure").each(function () {
        $(this).find("div:eq(0)").click(function () {
            if (escap_uti.isEventOnly()) {
                $(this).next().next().slideToggle();
                //$(this).next().slideToggle();
            }
        });
    });



    $("*").not("html,body,section, ol, li").click(function () {
        event.stopPropagation();
        escap_uti.removeDirt();

        if (escap_uti.isEditOnly()) {
            $(this).attr("contenteditable", "true");
        }
        if (escap_uti.isEventOnly()) {

        }
        if (escap_uti.isLocked()) {
            return;
        }
    }).keydown(function (e) {
        escap_uti.removeDirt();
        event.stopPropagation();
        var edi = $(this).attr("contenteditable");
        if (edi) {
            $(this).addClass("hili");
            $("body").attr("onbeforeunload", "return 'leave?';");
            if (escap_uti.isEventOnly()) {
                var tag = $(this).prop("tagName");
                console.log(tag);
                if (16 === event.keyCode) {//press key: shift
                    $(`<div contenteditable='true' p="1">[div]</div>`).insertAfter(this);
                }
            }
        }
    });
    $("*").keyup(function (e) {
        var iLock = event.getModifierState("CapsLock");
        if (iLock) {
            console.log("CapsLock is on.....");
        } else {
            //$("body").css("background-color", "");
        }
    });
    $("*").keydown(function (e) {
        escap_uti.removeDirt();
        event.stopPropagation();
        var iLock = event.getModifierState("CapsLock");
        console.log("keyCode", e.keyCode, iLock);
        if (iLock) {
            console.log("CapsLock is on.....");
        } else {
            console.log("CapsLock is off.....");
        }
        if (18 === event.keyCode) {//=ALT
            if (escap_uti.isEventOnly()) {

                pdf_page_number_uti.ruler(false);
                escap_uti.init();
                table_of_content.set(false);
                list_of_illustration.set(-1);
            }
        }
        if (80 === event.keyCode) {//=P
            if (escap_uti.isEventOnly()) {
                uti.webpage_format();
                pdf_page_number_uti.ruler(true);
            }
        }
        if (91 === event.keyCode || 83 === event.keyCode) { //=cmd+S == printkey
            if (escap_uti.isEventOnly() || escap_uti.isEditOnly()) {
                //return alert("cannot save.");
            }
        }
        if (27 === e.keyCode) { //=ESC
            escap_uti.esc_keydown();
            if (escap_uti.isLocked()) {
                pdf_page_number_uti.ruler(true);
            }
            if (undefined === this._idx) this._idx = -1;
            this._idx = (++this._idx) % 2;
            var colr = ["#667788", "#9911ff"];
            //$("body").css("background-color", colr[this._idx]);
        }
    });
}
var escap_uti = {
    State: ["fulllock", "editonly", "loadonly"],
    init: function () {
        document.g_escap_locked = 0;
        this.removeAttr_All();
    },
    esc_keydown: function () {
        document.g_escap_locked = (++document.g_escap_locked) % (this.State.length);
        this.checkstate();
        console.log("document.g_escap_locked=", document.g_escap_locked)
    },
    checkstate: function () {
        if (0 === document.g_escap_locked) {
            $("body").removeAttr("style");
        } else if (1 === document.g_escap_locked) {
            $("body").css("background-color", "white");
        } else if (2 === document.g_escap_locked) {
            $("body").css("background-color", "red");
        } else {
            alert();
        }
        return document.g_escap_locked;
    },
    isLocked: function () {
        this.checkstate();
        if (0 === document.g_escap_locked) {
            return true;
        }
        return false;
    },
    isEditOnly: function () {
        this.checkstate();
        if (2 === document.g_escap_locked) {
            return true;
        }
        return false;
    },
    isEventOnly: function () {
        this.checkstate();
        if (1 === document.g_escap_locked) {
            return true;
        }
        return false;
    },

    removeAttr_All: function () {
        this.removeAddon();
        this.removeDirt();
        Load_Links.start(false);
        end_note_app.set(false);
        uti.clear_sjs();
    },
    removeAddon: function () {
        $("body").removeAttr("style").removeAttr("onbeforeunload");
        $("*").removeAttr("contenteditable").removeAttr("style");
        $("*").removeAttr("class");
    },
    removeDirt: function () {
        $("*").removeAttr("spellcheck").removeAttr("data-gr-c-s-loaded");
        $("grammarly-extension").remove();
        $("grammarly-card").remove();
        $("iframe").remove();
    }
}



function ol_type_set() {

    var olayer = {
        g_types: ["A", "a", "i", "1", "a", 'i'],
        recursive_type_set: function (eol, ideep) {
            if (ideep >= this.g_types.length) {
                console.log("ideep overflow:", ideep);
                return;
            }
            $(eol).attr("type", this.g_types[ideep]);


            $(eol).children("*").not("ol").each(function () {
                olayer.recursive_explore(this, ideep);
            });

            $(eol).children("ol").each(function () {
                olayer.recursive_type_set(this, ideep + 1);
            });
        },
        recursive_explore: function (root, ideep) {
            if (ideep >= this.g_types.length) {
                console.log("ideep overflow:", ideep);
                return;
            }
            $(root).children("*").not("ol").each(function () {
                olayer.recursive_explore(this, ideep);
            });

            $(root).children("ol").each(function () {
                olayer.recursive_type_set(this, ideep + 1);
            });

        }
    };
    var ol_div_li = {
        g_types: ["A", "a", "i", "1", "a", 'i'],
        get_idx: function (ilayer, idx) {
            switch (ilayer) {
                case 0:
                    return String.fromCharCode(65 + idx); //:A
                case 1:
                    return String.fromCharCode(97 + idx); //:a
                case 2:
                    const ROMIDX = ["i", "ii", "iii", "iv", "v", "vi", "vii", "viii", "ix", "x", "xi", "xii", "xiii"];
                    return ROMIDX[idx];
                case 3:
                    return idx + 1;
                default:
                    return idx;
            }
        },
        recursive_type_set: function (eol, ideep) {
            if (ideep >= this.g_types.length) {
                console.log("ideep overflow:", ideep);
                return;
            }
            //$(eol).attr("type", this.g_types[ideep]);
            $(eol).children("div[li]").each(function (i) {
                $(this).find("a").remove();
                $(this).prepend(`<a>${ol_div_li.get_idx(ideep, i)}. </a>`);
            })


            $(eol).children("*").not("ol").each(function () {
                ol_div_li.recursive_explore(this, ideep);
            });

            $(eol).children("ol").each(function () {
                ol_div_li.recursive_type_set(this, ideep + 1);
            });
        },
        recursive_explore: function (root, ideep) {
            if (ideep >= this.g_types.length) {
                console.error("weid recursive_explore overflow:", root, ideep);
                return;
            }
            $(root).children("*").not("ol").each(function () {
                ol_div_li.recursive_explore(this, ideep);
            });

            $(root).children("ol").each(function () {
                ol_div_li.recursive_type_set(this, ideep + 1);
            });

        }
    }


    //$(function () {
    //olayer.recursive_explore("body", -1);
    ol_div_li.recursive_explore("body", -1);
    //});
}


var end_note_app = {
    set: function (bPrint) {
        end_note_app.load_bib(bPrint);
        end_note_app.note_indexer(bPrint);
        end_note_app.quote_filler(bPrint);
        end_note_app.end_notes(bPrint);

        end_note_app.gen_bibliography(bPrint);
    },
    note_indexer: function (bPrint) {
        var _THIS = this;
        if (bPrint === true) {
            _THIS.m_bibidAry = [];
            _THIS.m_pgAry = [];
            $("sup[title]").each(function (i) {
                var anchor = `[${(1 + i)}]`;
                if (typeof window.event.getModifierState != "function" || window.event.getModifierState("CapsLock")) {
                    anchor = `<a endnote="1" href="#endnote${1 + i}">[${(1 + i)}]</a>`;
                }
                $(this).html(anchor);
                var pg = $(this).attr("pg");
                if (undefined === pg) pg = "";
                _THIS.m_pgAry.push(pg);

                var tx = $(this).attr("title");
                _THIS.m_bibidAry.push(tx);
            });
        } else {
            $("sup[title]").text("[]");
        }
    },
    quote_filler: function (bPrint) {
        var _THIS = this;
        if (bPrint === true) {
            $("a[q][title]").each(function (i) {
                var bibid = $(this).next().attr("title");
                var qid = $(this).attr("title");
                var bibobj = _THIS.m_bibObj[bibid];
                var tx = bibobj.quotes[qid];
                $(this).text(`"${tx.trim()}"`);
            });
        } else {
            $("a[q][title]").text(`"..."`);
        }
    },
    end_notes: function (bPrint) {
        if (!bPrint) {
            $("#EndNotes").next().html("end_notes");
            return;
        }
        var ss = "";//"<ul type='none'>";
        var prevBiid = "";
        for (var i = 0; i < this.m_bibidAry.length; i++) {
            ss += `<br><a type='endnote' name='endnote${i + 1}'>&nbsp;&nbsp;&nbsp;&nbsp;<sup>${i + 1}</sup> `;
            var nid = this.m_bibidAry[i];
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
            if(!noteObj){
                console.error("nid not exist:",nid)
            }
            ss += Bibliography_Endnote_Uti.get_footnote(noteObj);
            ss += pg;
            ss += "</a>";
        };
        //ss += "</ul>";
        $("#EndNotes").next().html(ss);
    },

    load_bib: function (bPrint) {
        var path = "../../../../weid/pdf2018/latx/bib_generator/authorInfo/bibDat/";
        var fary = ["BibDat_ZiZi.json.js", "BibDat_OBI.json.js", "ciu_reading.json.js", "china_bio.json.js", "collected_news_bio.json.js", "BibDat_SonOfMan.json.js",  "BibDat_FamilialVocab.json.js"];
        if (!bPrint) {
            for (var i = 0; i < fary.length; i++) {
                $(`script[src='${path + fary[i]}']`).remove();
            }
            return;
        }
        if (undefined != this.m_bibObj) {
            return;
        }
        this.m_bibObj = {};
        for (var i = 0; i < fary.length; i++) {
            var f1 = path + fary[i];
            uti.gen_sjs(f1);
            this.cpy(this.m_bibObj, BibDat);
        }
    },
    cpy: function (tarObj, srcobj) {
        Object.keys(srcobj).forEach(function (key) {
            if (undefined === tarObj[key]) {
                if (undefined != tarObj[key]) {
                    alert("duplicated key", key);
                }
                tarObj[key] = JSON.parse(JSON.stringify(srcobj[key]));
            } else {
                console.log("Duplicate key bibid:", key);
            }
        });
    },

    gen_bibliography: function (bPrint) {
        if (!bPrint) {
            $("#Bibliograph").text(Bibliograph);
            return;
        }
        var bibAr = [];
        var _THIS = this;
        var uniqCheckObj = {};
        _THIS.m_bibidAry.forEach(function (biid, i) {
            if (undefined !== uniqCheckObj[biid]) return;
            uniqCheckObj[biid] = 1;
            var biOj = _THIS.m_bibObj[biid];
            var bib = Bibliography_Endnote_Uti.get_bibliography(biOj);
            bibAr.push(bib);
        });
        bibAr.sort();
        var sol = "";// "<div id='Bibliograph' type='none'>";
        for (var i = 0; i < bibAr.length; i++) {
            var bib = bibAr[i];
            sol += `<div type='bibliography_item' title='${i}'>${bib}</div><br><br>`;
        }
        //sol += "</div>";

        $("#Bibliograph").html(sol);
    }
}

var pdf_page_number_uti = {
    m_pos_start: -1,
    m_ioffset: 5,
    init: function (pos) {
        if (-1 === pdf_page_number_uti.m_pos_start) {
            pdf_page_number_uti.m_pos_start = parseInt(pos.top);
        }
    },
    get_page_num: function (x) {
        var ipage = (x.top - this.m_pos_start) / 700 + 1;
        ipage = this.m_ioffset + parseInt(ipage);
        return ipage;
    },
    ruler: function (bP) {
        if (!bP) {
            $(".ruler").remove();
            return;
        }
        if ($(".ruler").length > 0) {
            return;
        }
        var ipage = 0, startPage=7, endPage = 82;
        alert(`print pg number:\n startPage=${startPage}, endPage=${endPage}.`);
        for (var i = startPage; i < endPage; i++) {
            var y = i * 10.13525 + (i - 2) * 0.0925;//in;//in;
            //y = i * 10.22775 - 0.185;//in
            y = i * 10.22775;// - 0.210;//in
            ipage++;
            $("body").prepend(`<span class='ruler' style='position:absolute;top:${y}in;right:5px;color:blue;'>-${ipage}-</span>`);
        }
    }
}
var table_of_content = {
    "InitIndex": function (jsfile) {
        table_of_content.m_jsfile = jsfile;
        uti.gen_sjs(jsfile);
        console.log(_items_page_size);
        if (!_items_page_size) {
            alert(jsfile);
        }


        const RomIdx = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
        var _THIS = this;
        _THIS.toc_href(-1);
        $("h3[chapter]").each(function (i) {
            var romanidx = `${RomIdx[i]}.`;
            $(this).find("a[chpnum]").text(romanidx);///// to re-calc chapter num. 
            $(this).find("a[chpnum]").attr("name", _THIS.toc_href(0));
            if (1) {//subtitles
                $(this).next().find("div[subpagesize]").each(function (i) {
                    $(this).find(`a[subpage_idx]`).remove();
                    $(this).prepend(`<a subpage_idx name="${_THIS.toc_href(0)}">${i + 1}. </a>`);
                });
            }
        });
    },
    toc_href: function (inc) {
        if (-1 === inc) {
            this.m_toc_uid = 0;
            return;
        }
        var mark = "uid";
        if (0 === inc) {
            return `${mark}${++this.m_toc_uid}`;
        }

        if (typeof window.event.getModifierState != "function") {
            return ` href="#${mark}${++this.m_toc_uid}"`;
        }

        var iLock = event.getModifierState("CapsLock");
        if (!iLock) {
            return "";
        }
        if (1 === inc) {
            return ` href="#${mark}${++this.m_toc_uid}"`;
        }
        return alert("wrong input");
    },
    set: function (bPrint) {
        if (!bPrint) {
            $("#toc").html("toc");
            return;
        }
        const RomIdx = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        var toc = "";
        $("h3[PreChapter]").each(function () {
            var tx = $(this).text();
            toc += `<a>${tx}</a><br>\n`;
        });

        var totalpages = 1.0;//start page.
        toc += `<div toc_item_page_num="1">`;
        var _THIS = this;
        _THIS.toc_href(-1);
        $("h3[chapter]").each(function (i) {

            var chapter = $(this).text().trim();
            var tx = MeasureTextWidth.toFixedWidth(chapter, " . ", 300);
            var chaperId = $(this).text().replace($(this).find("a[chpnum]").text(), "").trim().replace(/[\"\']/g, "");
            toc += `<div toc_chapter="i"><a style='width:100px;' nowrap='1' type='toc_item' ${_THIS.toc_href(1)}>${tx}</a><a PageNum='${totalpages}'>${parseInt(totalpages)}</a>`;
            if (1) {//subtitles
                toc += `<div toc_item_page_num="1">`;
                $(this).next().find("div[subpagesize]").each(function (i) {
                    var subs = $(this).text().trim();
                    var subId = $(this).text().replace($(this).find("a[subpage_idx]").text(), "").replace(/[\"\']/g, "").trim();
                    if (subs.indexOf("Summary:") >= 0) {//debug.
                        //alert(tx);
                    }
                    tx = MeasureTextWidth.toFixedWidth(subs, " . ", 275);
                    toc += `<div toc_sub_chapter><a ${_THIS.toc_href(1)}>${tx}</a> <a PageNum='${totalpages}'>${parseInt(totalpages)}</a></div>`;

                    var pagesize = 0;
                    if (_items_page_size[chaperId] && _items_page_size[chaperId][subId]) {
                        pagesize = _items_page_size[chaperId][subId][0];
                    }
                    else {
                        console.error("Invalid chId, subid:", chaperId, subId);
                        console.error("in table_of_content.m_jsfile:", table_of_content.m_jsfile);
                    }
                    totalpages += parseFloat(pagesize);
                });
                toc += "</div>";
            }
            var pagesize = 0;//$(this).attr("pagesize");
            if (undefined === pagesize) pagesize = 0;
            totalpages += parseFloat(pagesize);
            toc += `</div>`;
        });
        toc += "</div>";

        var AppendixPage = 0;
        $("h3[PostChapter]").each(function (i) {
            var tx = $(this).text();
            if (tx === "Appendix") {
                AppendixPage = totalpages;
            }
            tx = MeasureTextWidth.toFixedWidth(tx, " . ", 320);
            toc += `<a>${tx}<a PostChapterPageNum='${i}'>${parseInt(totalpages)}</a></a><br>`;

            var pagesize = $(this).attr("pagesize");
            if (undefined === pagesize) pagesize = 0;
            totalpages += parseFloat(pagesize);
        });

        $("#toc").html(toc);
        return AppendixPage;//prev totalpages as the configure page start. 
    }
}
var list_of_illustration = {
    set: function (startpage) {
        if (startpage <= 0) {
            $("#ListOfFigures").text("ListOfFigures");
            $("#ListOfTables").text("ListOfTables");
            return;
        }
        this.init_figure(startpage);
        this.init_table(startpage);
    },
    init_figure: function (startpage) {
        var sls = "";
        $("figure[figtype=img").each(function (i) {
            var tx = $(this).find("figcaption").html();
            tx = MeasureTextWidth.toFixedWidth(tx, " . ", 350);
            sls += `<p>${tx} <a FigurePageNum='${i}'>${parseInt(startpage)}</a></p>`;
            startpage += i % 2;
        });
        $("#ListOfFigures").html(sls);

        $("figure[figtype=img").each(function (i) {
            var x = $(this).position();
            var ipage = pdf_page_number_uti.get_page_num(x);
            //$(`a[FigurePageNum=${i}]`).text(ipage);
        });
    },
    init_table: function (startpage) {
        var sls = "";
        $("figure[figtype=table").each(function (i) {
            var id = $(this).find("div:eq(0)").text();
            var tx = $(this).find("div:eq(1)").html();
            tx = MeasureTextWidth.toFixedWidth(tx, " . ", 350);
            sls += `<p>${id}: ${tx} <a TabePageNum='${i}'>${parseInt(startpage)}</a></p>`
        });

        $("#ListOfTables").html(sls);

        $("figure[figtype=table").each(function (i) {
            var x = $(this).position();
            var ipage = pdf_page_number_uti.get_page_num(x);
            $(`a[TabePageNum=${i}]`).text(ipage);
        });
    }
}