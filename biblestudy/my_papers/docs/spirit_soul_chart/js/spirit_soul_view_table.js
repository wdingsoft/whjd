







var Stats_Viewer = function () {

}

Stats_Viewer.prototype.Set = function (wordFrqsDb) {
    var fullView_Stats = {}
    var fullView_Total = {}
    var fullView_Rates = {}

    Object.keys(wordFrqsDb).forEach(function (keyWord) {
        fullView_Stats[keyWord] = JSON.parse(JSON.stringify(BlueLetterBibleCode_Stats_Init))
        fullView_Rates[keyWord] = JSON.parse(JSON.stringify(BlueLetterBibleCode_Stats_Init))

        var obj = wordFrqsDb[keyWord]
        fullView_Total[keyWord] = 0
        Object.keys(obj).forEach(function (book) {
            if (!fullView_Stats[keyWord][book]) { alert(keyWord + "=" + book) }
            fullView_Stats[keyWord][book] = obj[book]
            fullView_Rates[keyWord][book] = (obj[book] * 100 / BooksTotalWords[book]).toFixed(2.2)
            fullView_Total[keyWord] += obj[book]
        })
    });;;;/////////////

    this.KeyWord_BooksFrq = fullView_Stats;
    this.KeyWord_BooksRat = fullView_Rates;
    this.KeyWord_BooksSum = fullView_Total;
};

Stats_Viewer.prototype.output_dat2table = function (caption, key_booksval) {
    var fullView_Total = this.KeyWord_BooksSum

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
        var tr = `<tr><td>${idx++}</td><td class='bkid'>${book}</td><td>${BooksTotalWords[book]}</td>`
        Object.keys(BlueLetter_WordFrq_DB).forEach(function (keyword) {
            var frq = key_booksval[keyword][book]
            if (frq <= 0) frq = ""
            tr += `<td class='frqval'>${frq}</td>`
        })
        tr += "</tr>"
        tab += tr
    })
    tab += "</tbody>"
    return tab;
}

Stats_Viewer.prototype.output_table = function (caption, bRate) {
    var tab = this.output_dat2table(caption, this.KeyWord_BooksFrq)
    if (bRate) {
        tab = this.output_dat2table(caption, this.KeyWord_BooksRat)
    }
    return tab
}


Stats_Viewer.prototype.output_chart_data = function (cbf) {

    var word_booksRate = this.KeyWord_BooksRat

    var chart_booksValarr = new Array(Object.keys(BlueLetterBibleCode_Stats_Init).length);
    for (var i = 0; i < chart_booksValarr.length; i++) {
        chart_booksValarr[i] = new Array(1 + Object.keys(word_booksRate).length);
        chart_booksValarr[i][0] = i
    }

    var icol = 0
    Object.keys(word_booksRate).forEach(function (keyWord) {
        if (cbf) cbf(keyWord)
        var obj = word_booksRate[keyWord]
        var idx = 0
        icol++
        Object.keys(obj).forEach(function (book) {
            chart_booksValarr[idx++][icol] = (obj[book] * 100)
        })

    });;;;/////////////

    return chart_booksValarr
}

Stats_Viewer.prototype.output_chart_sel = function (icol, cbf) {
    var name = Object.keys(this.KeyWord_BooksRat)[icol]
    if (cbf) cbf(name)

    var chart_booksValarr = this.output_chart_data()

    var retary = []
    for (var idx = 0; idx < 39; idx++) {
        var val = chart_booksValarr[idx][1+icol]
        var ar = [idx, val];
        retary.push(ar)
    }
    return retary
}

//Stats_Viewer.Start(BlueLetter_WordFrq_DB)
//var tab = Stats_Viewer.output_table()