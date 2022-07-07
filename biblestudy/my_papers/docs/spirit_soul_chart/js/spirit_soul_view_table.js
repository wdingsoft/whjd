







var Stats_Viewer = {
    FullView_Stats: {},
    FullView_Total: {},
    Start: function (wordFrqsDb) {
        var fullView_Stats = this.FullView_Stats
        Object.keys(wordFrqsDb).forEach(function (keyWord) {
            fullView_Stats[keyWord] = JSON.parse(JSON.stringify(BlueLetterBibleCode_Stats_Init))
            var obj = wordFrqsDb[keyWord]
            Stats_Viewer.FullView_Total[keyWord] = 0
            Object.keys(obj).forEach(function (book) {
                if (!fullView_Stats[keyWord][book]) { alert(keyWord + "=" + book) }
                fullView_Stats[keyWord][book] = obj[book]
                Stats_Viewer.FullView_Total[keyWord] += obj[book]
            })
        });;;;/////////////

    },

    Tot: function (db) {

    },

    output_table: function (caption, bkTot) {
        var fullView_Stats = this.FullView_Stats

        var theader = "<thead><tr><td>#</td><td>Book</td><td>TotWords</td>"
        Object.keys(BlueLetter_WordFrq_DB).forEach(function (keyword) {
            theader += `<th>${keyword}</th>`
        })
        theader += "</tr><tr><td></td><td></td><td></td>"
        Object.keys(BlueLetter_WordFrq_DB).forEach(function (keyword) {
            theader += `<th>x${Stats_Viewer.FullView_Total[keyword]}</th>`
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
}

//Stats_Viewer.Start(BlueLetter_WordFrq_DB)
//var tab = Stats_Viewer.output_table()