var margin = {left:50,right:50,top:40,bottom:50};

//var height = 600;
//var width = 860;

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("./hijackers_adjacency_list.json", function(error, graph) {
  if (error) throw error;

  var link = svg.append("g")
        .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
          .attr("stroke-width", function(d) {return "1"; });

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
        d.terrorist;
      })
      .attr('x', 6)
      .attr('y', 3);

  node.append("title")
      .text(function(d) { return d.terrorist});

  simulation
      .nodes(network_data[0].nodes)
      .on("tick", ticked);

  simulation.force("link")
      .links(network_data[0].links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.x; })
        .attr("x2", function(d) { return d.source.x; })
        .attr("y2", function(d) { return d.source.x; });

    node
        .attr("transformation", function(d) {
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
  d.fx = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
