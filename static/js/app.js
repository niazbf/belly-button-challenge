// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field


    // Filter the metadata for the object with the desired sample number
    let metadata = data.metadata.find(obj => obj.id == sample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let metadataPanel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    metadataPanel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(metadata).forEach(([key, value]) => {
      metadataPanel.append("p").text(`${key}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let sampleData = samples.filter(obj => obj.id == sample);
    let result = sampleData[0];
    // Get the otu_ids, otu_labels, and sample_values
    let otuIds = result.otu_ids;
    let otuLabels = result.otu_labels;
    let sampleValues = result.sample_values;

    // Build a Bubble Chart
    let bubbleLayout = {
      // Set layout properties for the Bubble Chart
        title: 'Bacteria Cultures Per Sample',
        height: 800,
        width: 1500,
    };

    let bubbleData = [{
      x: otuIds,
      y: sampleValues,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: "Earth"
      }
      // Set data properties for the Bubble Chart
    }];

    // Render the Bubble Chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    let yticks = otuIds.slice(0, 10).map(id => `OTU ${id}`).reverse();
    

    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately
    let barData = [{
      y: yticks,
      x: sampleValues.slice(0,10).reverse(),
      type: "bar",
      orientation: "h"
      // Set data properties for the Bar Chart
    }];
    let barLayout = {
      title: 'Top 10 Bacteria Cultures Found',
      height: 800,
      width: 1500,
      xaxis: {"title":"Number of Bacteria"},
      // Set layout properties for the Bar Chart
    };
    // Render the Bar Chart
    Plotly.newPlot("bar", barData, barLayout);
  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((sample) => {
      dropdownMenu.append("option").text(sample).property("value", sample);
    });

    // Get the first sample from the list
    let firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
