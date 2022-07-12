
function gen_chart(eid, icol) {

    var tabvw = new DatViewerApp(BlueLetter_WordFrq_DB);

    google.charts.load('current', { packages: ['corechart', 'line'] });
    google.charts.setOnLoadCallback(drawCurveTypes);

    function drawCurveTypes() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'X');
        //data.addColumn('number', 'Dogs');//1
        //data.addColumn('number', 'Cats');//2
        /////data.addColumn('number', 'Cats');//3
        /////data.addColumn('number', 'Cats');//4
        /////data.addColumn('number', 'Dogs');//5
        /////data.addColumn('number', 'Cats');//6
        /////data.addColumn('number', 'Cats');//7
        /////data.addColumn('number', 'Cats');//8
        /////data.addColumn('number', 'Cats');

        var samp = [
            [0, 0, 0], [1, 10, 5], [2, 23, 15], [3, 17, 9], [4, 18, 10], [5, 9, 5],
            [6, 11, 3], [7, 27, 19], [8, 33, 25], [9, 40, 32], [10, 32, 24], [11, 35, 27],
            [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
            [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
            [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
            [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
            [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
            [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
            [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
            [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
            [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
            [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
        ]
        samp = tabvw.output_chart_sel(icol, function (name) {
            data.addColumn('number', name);//8
        })


        data.addRows(samp);

        var options = {
            hAxis: {
                title: 'The Index of the Book in the OT'
            },
            vAxis: {
                title: 'The Hebrew Frequency Rate (1000 %)'
            },
            series: {
                1: { curveType: '' } //function:curve
            },

            colors: ['green', 'blue', 'yellow', 'cyan', 'gray', 'orange', 'purple', 'bisque', 'black', 'lightgray', 'azure', 'lightgray']
        };

        var chart = new google.visualization.LineChart(document.getElementById(eid));
        chart.draw(data, options);
    }
}


function gen_barchart_sample(eid) {
    function drawChart() {
        /* Define the chart to be drawn.*/
        var data = google.visualization.arrayToDataTable([
            ['Page Vist', 'Students Tutorial', { role: 'style' }, 'a', { role: 'style' }],
            ['2012', 10000, "red", 10000, "blue"],
            ['2013', 23000, "green", 23000, "blue"],
            ['2014', 46000, "red", 46000, "blue"],
            ['2015', 49000, "red", 49000, "blue"],
            ['2016', 55000, "red", 550000, "blue"],
            ['2017', 10000, "red", 10000, "blue"],


        ]);
        var options = {
            title: 'Page visit per year',
            isStacked: true,
            series: { 1: { type: 'line' } },
        };
        /* Instantiate and draw the chart.*/
        var chart = new google.visualization.BarChart(document.getElementById(eid));
        chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChart);
}
function gen_barchart(eid, icol) {
    function drawChart() {
        var tabvw = new DatViewerApp(BlueLetter_WordFrq_DB);

        /* Define the chart to be drawn.*/


        var options = {
            title: 'Frequency Rate (%)',
            isStacked: true,
            series: { 1: { type: 'line' } },
        };

        var dat = tabvw.output_BarChart_Arr_by_icol(icol, function (kname) {
            options.title = kname + " in " + options.title
        })
        var data = google.visualization.arrayToDataTable(dat);

        /* Instantiate and draw the chart.*/
        var chart = new google.visualization.BarChart(document.getElementById(eid));
        chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChart);
}

function gen_ComboChart(eid, icol) {
    function drawChart1() {
        // Define the chart to be drawn.
        var dat = [
            ['Fruit', 'Jane', { role: 'style' }, 'Average'],
            ['Apples', 30, 'gray', 2.5],
            ['Oranges', 30, 'blue', 2.5],
            ['Pears', 30, 'gray', 3],
            ['Bananas', 30, 'gray', 6],
            ['Plums', 40, 'gray', 3],
        ]
        //var dat = [["Frq Rate", "Books", {role:'style', }, "-", {role:'style'}]]


        var tabvw = new DatViewerApp(BlueLetter_WordFrq_DB);


        // Set chart options
        var options = {
            title: 'Frq Rate Distribution',
            vAxis: { title: 'Frq Rate (%)' },
            hAxis: { title: 'Index of Books' },
            seriesType: 'bars',
            //series: { 1: { type: 'line', color: 'blue' } },
            //colors: ['red', 'blue'],
            //indexAxis: 'y',//?
            //barValueSpacing: 2000,//?
            //axis: 'vertical',//?
        };

        var dat = tabvw.output_BarChart_Arr_by_icol(icol, function (kname) {
            options.title = kname;//+ " in " + options.title
        })
        var data = google.visualization.arrayToDataTable(dat);



        // Instantiate and draw the chart.
        var chart = new google.visualization.ComboChart(document.getElementById(eid));
        chart.draw(data, options);
    }

    google.charts.setOnLoadCallback(drawChart1);
}



function gen_ComboChart_group(eid, icolary) {
    google.charts.load('current', { packages: ['corechart', 'line'] });

    function drawChart1() {
        // Define the chart to be drawn.
        var dat = [
            ['Fruit', 'Jane', { role: 'style' }, 'Average'],
            ['Apples', 30, 'gray', 2.5],
            ['Oranges', 30, 'blue', 2.5],
            ['Pears', 30, 'gray', 3],
            ['Bananas', 30, 'gray', 6],
            ['Plums', 40, 'gray', 3],
        ]
        //var dat = [["Frq Rate", "Books", {role:'style', }, "-", {role:'style'}]]


        var tabvw = new DatViewerApp(BlueLetter_WordFrq_DB);
        var ret = tabvw.getBooksArry(icolary)
        //ret.darr.unshift(ret.headers)


        // Set chart options
        var options = {
            title: ret.names.join(" : "),
            vAxis: { title: 'Frq Rate (%)' },
            hAxis: { title: 'Index of Books' },
            seriesType: 'bars',
            series: {
                1: { type: 'line', color: 'red' },
                2: { type: 'line', color: 'black' },
                3: { type: 'line', color: 'black' },
                4: { type: 'line', color: 'black' },
                5: { type: 'line', color: 'black' },
                6: { type: 'line', color: 'black' },
                7: { type: 'line', color: 'black' },
                8: { type: 'line', color: 'black' },
                9: { type: 'line', color: 'black' },
                10: { type: 'line', color: 'black' },
                11: { type: 'line', color: 'black' },

            },
            colors: ['lightgray', 'blue'],
            //indexAxis: 'y',//?
            //barValueSpacing: 2000,//?
            //axis: 'vertical',//?
        };
        var linecolrs = ['green', 'blue', 'yellow', 'cyan', 'gray', 'orange', 'purple', 'bisque', 'black', 'lightgray', 'azure', 'lightgray']
        linecolrs.forEach(function (clrs, idx) {
            options.series[1 + idx] = { type: 'line', color: clrs };
        })

        var data = google.visualization.arrayToDataTable(ret.darr);

        // Instantiate and draw the chart.
        var chart = new google.visualization.ComboChart(document.getElementById(eid));
        chart.draw(data, options);
    }

    google.charts.setOnLoadCallback(drawChart1);
}