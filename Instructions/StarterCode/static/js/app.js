// // Unpack function
// function unpack(rows, index) {
//     return rows.map(function(row) {
//       return row[index];
//     });
//   }

// Load samples file
d3.json("samples.json").then((data) => {
    // print entire dataset    WORKING
    var dataset= data.samples
    // console.log(dataset)

    // print ids  WORKING
    var ids= dataset.map(d => d.id)
    // console.log(ids)

    // get 940 ID 
    var filteredDataset= dataset.filter(d => d.id === "940")
    console.log(filteredDataset)

    // get otu_ids  WORKING
    var otuIds= filteredDataset.map(d => d.otu_ids.slice(0,10))[0]
    console.log(otuIds)

    // add "OTU" to each otu_id  WORKING
    var otuIdLong= otuIds.map(d => `OTU ${d}`)
    console.log(otuIdLong)

    // get sample_values WORKING
    var sampleValues=filteredDataset.map(d => d.sample_values.slice(0,10))[0]
    console.log(sampleValues[0])

    // get otu_labels WORKING
    var otuLabels= filteredDataset.map(d => d.otu_labels.slice(0,10))[0]
    console.log(otuLabels)


    // Trace1 
    var trace1 = {
        x: sampleValues.reverse(),
        y: otuIdLong.reverse(),
        text: otuLabels,
        type: "bar",
        orientation: "h"
        };
    
    // data
    var data = [trace1];

    // Apply the group bar mode to the layout
    var layout = {
        xaxis: {title: "Sample values"},
        // margin: {
        //     l: 100,
        //     r: 100,
        //     t: 100,
        //     b: 100
        // }
    };

    // Render the plot to the div tag with id "plot"
    Plotly.newPlot("bar", data, layout);

    // Call updatePlotly() when a change takes place to the DOM
    // d3.selectAll("#selDataset").on("change", updatePlotly);

});

// // This function is called when a dropdown menu item is selected
// function updatePlotly() {
//     // Use D3 to select the dropdown menu
//     var dropdownMenu = d3.select("#selDataset");
//     // Assign the value of the dropdown menu option to a variable
//     var dataset = dropdownMenu.property("value");
  
//     // Initialize x and y arrays
//     var x = [];
//     var y = [];
  
//     if (dataset === 'dataset1') {
//       x = [1, 2, 3, 4, 5];
//       y = [1, 2, 4, 8, 16];
//     }
  
//     if (dataset === 'dataset2') {
//       x = [10, 20, 30, 40, 50];
//       y = [1, 10, 100, 1000, 10000];
//     }
  
//     // Note the extra brackets around 'x' and 'y'
//     Plotly.restyle("plot", "x", [x]);
//     Plotly.restyle("plot", "y", [y]);
//   }