//READ SAMPLE.JSON FILE
d3.json("./data/samples.json").then((bellyButtonData) => {
    
    // retrieve data on samples
    var dataset= bellyButtonData.samples

    // POPULATE DROPDOWN MENU
    // retrieve ids  
    var ids= dataset.map(d => d.id)
    // create an option for each id
    ids.forEach(function(d) {
        d3.selectAll("#selDataset")
        .append("option")
        .text(d);
    });

    // DROPDOWN EVENTS
    // On change to the DOM, call updateId()
    d3.selectAll("#selDataset").on("change", updateId);

    // Create a function to handle the event
    function updateId () {
        var dropdownMenu= d3.select("#selDataset");
        // assign value of dropdown menu to a variable
        var inputId= dropdownMenu.property("value"); 
        // plot bar and bubble chart and update metadata
        plotBar(inputId);
        plotBubble(inputId);
        displayMetadata(parseInt(inputId));
    }
    
    // -------------------------------------------
    // FUNCTION TO FILTER DATA AND RETRIEVE INFO
    function filterData(chosenId) {

        // filter dataset with id selected in the dropdown menu
        var filteredDataset= dataset.filter(d => d.id === chosenId)

        // get otu_ids and slice top 10 
        var otuIds= filteredDataset.map(d => d.otu_ids)
        var slicedOtuIds= otuIds[0].slice(0,10)

        // add "OTU" to each otu_id  (will need this for bar chart)
        var otuIdLong= slicedOtuIds.map(d => `OTU ${d}`)

        // get sample_values and slice top 10 
        var sampleValues=filteredDataset.map(d => d.sample_values)                                     
        var slicedSampleValues= sampleValues[0].slice(0,10)

        // get otu_labels and slice top 10 
        var otuLabels= filteredDataset.map(d => d.otu_labels)
        var slicedOtuLabels= otuLabels[0].slice(0,10)

        return ([slicedOtuIds, otuIdLong, slicedSampleValues, slicedOtuLabels]);
    };
    
    // -------------------------------------------
    // FUNCTION TO CREATE BAR CHART
    function plotBar(chosenId) {
        // run filter data function and return: [0]slicedOtuIds, [1]otuIdLong, [2]slicedSampleValues, [3]slicedOtuLabels
        
        // plot
        var trace1 = {
            x: filterData(chosenId)[2].reverse(),
            y: filterData(chosenId)[1].reverse(),
            text: filterData(chosenId)[3],
            type: "bar",
            orientation: "h"    
        };
        
        // data
        var dataBar = [trace1];

        // Apply the group bar mode to the layout
        var layoutBar = {
            title: "Bar Chart of TOP10 OTU for selected Subject ID",
            xaxis: {title: "Sample values"},
            yaxis: {title: "Operational Taxonomic Units (OTU)"},
            height: 600,
            width: 1000,
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", dataBar, layoutBar);
    };

    // -------------------------------------------
    // FUNCTION TO PLOT BUBBLE CHART
    function plotBubble(chosenId) {
        // run filter data function and return: [0]slicedOtuIds, [1]otuIdLong, [2]slicedSampleValues, [3]slicedOtuLabels
        
        // plot
        var trace2 = {
            x: filterData(chosenId)[0], 
            y: filterData(chosenId)[2],
            text: filterData(chosenId)[3],
            mode: "markers",
            marker: {
                size: filterData(chosenId)[2],
                color: filterData(chosenId)[0],
                opacity: 0.8
            }
        };
        
        // data
        var dataBubble = [trace2];

        // Apply the group bar mode to the layout
        var layoutBubble = {
            title: "Bubble Chart of TOP10 OTU for selected Subject ID",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample values"},
            height: 800,
            width: 1150,
            margin: {
                l: 50,
                r: 50,
                t: 100,
                b: 100
            }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", dataBubble, layoutBubble);
    }


    // -------------------------------------------
    // FUNCTION TO DISPLAY METADATA 
    function displayMetadata(chosenId) {

        // retrieve metadata
        var metadata= bellyButtonData.metadata

        // remove all info in demographic panel if exists
        d3.selectAll(".panel-body > h5").remove()

        // filter metadata according to chosen id
        var filteredMetadata= metadata.filter(d => d.id === chosenId)[0]
        
        // get key-value pairs and add them to the demographic info panel
        Object.entries(filteredMetadata).forEach(function([key, value]) {
            d3.selectAll(".panel-body").append("h5").html("<strong>" + key + ": " + value + "<strong>");
        });
    };          
    

    // -------------------------------------------
    // FUNCTION TO INITIALIZE
    function init() {
        plotBar("940");
        plotBubble("940");
        displayMetadata(940);
    }
    
    // call function to initialize
    init();

});

