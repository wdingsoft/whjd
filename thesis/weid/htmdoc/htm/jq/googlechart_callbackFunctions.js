
      google.charts.load('current', {packages:["orgchart"]});
      //https://www.gstatic.com/charts/loader.js

      
      //google.charts.setOnLoadCallback(drawChart1);
      //google.charts.setOnLoadCallback(drawChart2);
      //google.charts.setOnLoadCallback(drawChart3);

      function drawChart1() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows([
          [{v:'Ape', f:'Ape<div style="color:blue; font-style:italic">(Parent)</div>'},
           '', 'The Parent Class'],
          [{v:'Human', f:'Human<div style="color:red; font-style:italic">(Child)</div>'},
           'Ape', 'Child Class']
        ]);

        // Create the chart.
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div1'));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {allowHtml:true});
      }
      
      
      function drawChart2() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows([
          [{v:'Human', f:'Human<div style="color:blue; font-style:italic">(Parent)</div>'},
           '', 'The Parent Class'],
          [{v:'Ape', f:'Ape<div style="color:red; font-style:italic">(Child)</div>'},
           'Human', 'Child Class']
        ]);

        // Create the chart.
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div2'));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {allowHtml:true});
      }
      
      function drawChart3() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');

        // For each orgchart box, provide the name, manager, and tooltip to show.
        data.addRows([
          [{v:'VirtualSpecies', f:'VirtualSpecies<div style="color:blue; font-style:italic">(Parent)</div>'},
           '', 'The Parent Class'],
          [{v:'Human', f:'Human<div style="color:red; font-style:italic">(Child)</div>'},
           'VirtualSpecies', 'Child Class'],
           
           [{v:'Ape', f:'Ape<div style="color:red; font-style:italic">(Child)</div>'},
           'VirtualSpecies', 'Child Class'],
        ]);

        // Create the chart.
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div3'));
        // Draw the chart, setting the allowHtml option to true for the tooltips.
        chart.draw(data, {allowHtml:true});
      }
      
      
      
      
      
      
      
      
      
      
      
      
      
      //google.charts.setOnLoadCallback(drawChart_TBI_Sampling_Process_Flowchart);
      function drawChart_TBI_Sampling_Process_Flowchart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Name');
        data.addColumn('string', 'Manager');
        data.addColumn('string', 'ToolTip');
        data.addRows([
          [{v:'BonesCollection', f:'BonesCollection<div style="color:red; font-style:italic">150,000 pieces</div>'},'', 'including bones of turtles, ox, goat, etc'],
          
          [{v:'CharactersCollection', f:'CharactersCollection<div style="color:red; font-style:italic">46,635 characters:</div>'}, 'BonesCollection', 'CUV NT is  225 KC, Luke is 33 KC, Gen is 51 KC'],
          
          [{v:'Grouping', f:'Grouping<div style="color:red; font-style:italic">5650 distinct characters</div>'}, 'CharactersCollection', 'CUV has about 3,000 distinct characters.'],
          
 
          
          [{v:'Factoring', f:'Factoring<div style="color:red; font-style:italic">1200 root characters</div>'}, 'Grouping', '5650 - 4450 = 1200'],
          
          [{v:'Dividing', f:'Classification<div style="color:red; font-style:italic">Filter 1200 root characters into 3 categories</div>'}, 'Factoring', 'Classification'],
          
          [{v:'Pictograms', f:'Pictograms<div style="color:red; font-style:italic">600</div>'}, 'Dividing', '600 chars'],
          
          [{v:'Ideogram Linear', f:'Ideograms<div style="color:red; font-style:italic">400</div>'}, 'Dividing', '400 chars'],
          
          [{v:'Unknown', f:'Unknown<div style="color:red; font-style:italic">200</div>'}, 'Dividing', '200 chars'],
          
          
          [{v:'Inheritance', f:'Inheritance<div style="color:red; font-style:italic">400</div>'}, 'Ideogram Linear', 'Inheritance'],
          
           [{v:'IdeogramTree', f:'OOTree<div style="color:red; font-style:italic" onclick="alert();">400</div>'}, 'Inheritance', 'Object-Orientd Class Tree'],
           
           
           [{v:'PictogramTree', f:'HierarchyChart<div style="color:red; font-style:italic" onclick="alert()">600</div>'}, 'Pictograms', 'Hierarchy Chart'],
          

        ]);
        // set the background color of 3rd element in array Rows to #FFF
        //data.setRowProperty(2, 'style', 'background:#FFF');
        var chart = new google.visualization.OrgChart(document.getElementById('chart_div_TBI_Sampling_Process'));
        //chart.getOrgChart({orientation:RO_LEFT_PARENT_TOP}); // how to implement this??
        chart.draw(data, {allowHtml:true});
      }
  