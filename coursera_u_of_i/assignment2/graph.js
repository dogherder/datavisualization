var margin = {left:50,right:50,top:40,bottom:50};

var height = 600;
var width = 860;

var svg = d3.select("svg");


var links_data = d3.csv("https://raw.githubusercontent.com/dogherder/datavisualization/master/coursera_u_of_i/assignment2/9_11_HIJACKERS_ADJACENCY_LIST.csv")
  .row(function(d) {
    console.log(d);
    return {source: d.source, target: d.target} })
  .get(function(error,data) {
//  console.log(data);
});

//console.log(links_data);

var node_data = d3.csv("https://raw.githubusercontent.com/dogherder/datavisualization/master/coursera_u_of_i/assignment2/9_11_HIJACKERS_ATTR.csv").get(function(error,data) {
  return {
    data
  }
});

//console.log(node_data);

/*
var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fx = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

*/
