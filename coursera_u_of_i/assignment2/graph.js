var margin = {left:50,right:50,top:40,bottom:50};

//var height = 600;
//var width = 860;

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-10))
    .force("collide", d3.forceCollide(40).strength(.5).iterations(1))
    .force("x", d3.forceX(width/2).strength(.015))
    .force("y", d3.forceY(height/2).strength(.015))
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("https://raw.githubusercontent.com/dogherder/datavisualization/master/coursera_u_of_i/assignment2/hijackers_adjacency_list.json", function(error, graph) {
  if (error) throw error;
  console.log(graph)
  var link = svg.append("g")
        .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
          .attr("stroke-width", function(d) {return d.strength^2; });

  var node = svg.append("g")
        .attr("class", "nodes")
      .selectAll("g")
      .data(graph.nodes)
      .enter().append("g")

  var circles = node.append("circle")
      .attr("r", 5)
      .attr("fill", function(d) { return color(d.ties); })
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  var labels = node.append("text")
      .text(function(d) {
        return d.terrorist;
      })
      .attr('x', 6)
      .attr('y', 3);

  node.append("title")
      .text(function(d) { return d.terrorist});

  simulation
      .nodes(graph.nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
  }

});


//console.log(network_data[0]);

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

var legendpositionleft = width - 330;
var legendpositiontop = height - 220;

var legendGroup = svg.append("g").attr("class", "legend-group").attr("transform", "translate("+legendpositionleft+","+legendpositiontop+")");

var legend = legendGroup.append("rect")
        .attr("height", 85)
        .attr("width", 135)
        .attr("transform", "translate("+125+","+60+")")
        .style("stroke", "gray")
        .style("fill", "none");
var text1 = legendGroup.append("text")
        .attr("y", 55)
        .attr("x", 125)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("LEGEND");

var circle1 = legendGroup.append("circle")
        .attr("r", 5)
        .attr("cx", 140)
        .attr("cy", 72)
        .style("fill", "#ffbb78");          //#ffbb78
var circle2 = legendGroup.append("circle")
        .attr("r", 5)
        .attr("cx", 140)
        .attr("cy", 88)
        .style("fill", "#1f77b4")         //"#1f77b4
var circle3 = legendGroup.append("circle")
        .attr("r", 5)
        .attr("cx", 140)
        .attr("cy", 102)
        .style("fill", "#aec7e8");        //"#aec7e8
var circle4 = legendGroup.append("circle")
        .attr("r", 5)
        .attr("cx", 140)
        .attr("cy", 117)
        .style("fill", "#ff7f0e");        //"#ff7f0e
var circle5 = legendGroup.append("circle")
        .attr("r", 5)
        .attr("cx", 140)
        .attr("cy", 132)
        .style("fill", "#2ca02c");        //#2ca02c

var text1 = legendGroup.append("text")
        .attr("y", 75)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("AA #11 WTC North");        //AA #11 WTC North
var text2 = legendGroup.append("text")
        .attr("y", 90)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("AA #77 Pentagon");        //AA #77 Pentagon
var text3 = legendGroup.append("text")
        .attr("y", 105)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("UA #93 Pennsylvania");        //UA #93 Pennsylvania
var text4 = legendGroup.append("text")
        .attr("y", 120)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("//UA #175 WTC South");     //UA #175 WTC South
var text5 = legendGroup.append("text")
        .attr("y", 135)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("Other Associates");       //Other Associates
