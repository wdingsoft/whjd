







var Stats_Viewer = function () {
    this.KeyWord_BooksFrq = {};
    this.KeyWord_BooksTot = {};
}

Stats_Viewer.prototype.Set = function (wordFrqsDb) {
    var fullView_Stats = {}
    var fullView_Total = {}
    Object.keys(wordFrqsDb).forEach(function (keyWord) {
        fullView_Stats[keyWord] = JSON.parse(JSON.stringify(BlueLetterBibleCode_Stats_Init))
        var obj = wordFrqsDb[keyWord]
        fullView_Total[keyWord] = 0
        Object.keys(obj).forEach(function (book) {
            if (!fullView_Stats[keyWord][book]) { alert(keyWord + "=" + book) }
            fullView_Stats[keyWord][book] = obj[book]
            fullView_Total[keyWord] += obj[book]
        })
    });;;;/////////////

    this.KeyWord_BooksFrq = fullView_Stats;
    this.KeyWord_BooksTot = fullView_Total;
};

Stats_Viewer.prototype.output_table = function (caption, bkTot) {
    var fullView_Stats = this.KeyWord_BooksFrq
    var fullView_Total = this.KeyWord_BooksTot

    var theader = "<thead><tr><td>#</td><td>Book</td><td>TotWords</td>"
    Object.keys(BlueLetter_WordFrq_DB).forEach(function (keyword) {
        theader += `<th>${keyword}</th>`
    })
    theader += "</tr><tr><td></td><td></td><td></td>"
    Object.keys(BlueLetter_WordFrq_DB).forEach(function (keyword) {
        theader += `<th>x${fullView_Total[keyword]}</th>`
    })
    theader += "</tr></thead>"


    var tab = `<caption>${caption}</caption>${theader}<tbody>`
    var idx = 1
    Object.keys(BlueLetterBibleCode_Stats_Init).forEach(function (book) {
        var tr = `<tr><td>${idx++}</td><td class='bkid'>${book}</td><td>${BookTotWords[book]}</td>`
        Object.keys(BlueLetter_WordFrq_DB).forEach(function (keyword) {
            var frq = fullView_Stats[keyword][book]
            if (bkTot) {
                frq = (frq * 100 / bkTot[book]).toFixed(2, 2)
                if (frq <= 0) frq = ""
            }
            tr += `<td class='frqval'>${frq}</td>`
        })
        tr += "</tr>"
        tab += tr
    })
    tab += "</tbody>"
    return tab;
}


//Stats_Viewer.Start(BlueLetter_WordFrq_DB)
//var tab = Stats_Viewer.output_table()