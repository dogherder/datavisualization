var minTemps = [];
var maxTemps = [];

minTemps.push(d3.min(data, function(d) {return d.Glob; }));
minTemps.push(d3.min(data, function(d) {return d["64N-90N"]; }));
minTemps.push(d3.min(data, function(d) {return d["44N-64N"]; }));
minTemps.push(d3.min(data, function(d) {return d["24N-44N"]; }));
minTemps.push(d3.min(data, function(d) {return d["EQU-24N"]; }));
minTemps.push(d3.min(data, function(d) {return d["24S-EQU"]; }));
minTemps.push(d3.min(data, function(d) {return d["44S-24S"]; }));
minTemps.push(d3.min(data, function(d) {return d["64S-44S"]; }));
minTemps.push(d3.min(data, function(d) {return d["90S-64S"]; }));

var minTemp = d3.min(minTemps);

maxTemps.push(d3.max(data, function(d) {return d.Glob; }));
maxTemps.push(d3.max(data, function(d) {return d["64N-90N"]; }));
maxTemps.push(d3.max(data, function(d) {return d["44N-64N"]; }));
maxTemps.push(d3.max(data, function(d) {return d["24N-44N"]; }));
maxTemps.push(d3.max(data, function(d) {return d["EQU-24N"]; }));
maxTemps.push(d3.max(data, function(d) {return d["24S-EQU"]; }));
maxTemps.push(d3.max(data, function(d) {return d["44S-24S"]; }));
maxTemps.push(d3.max(data, function(d) {return d["64S-44S"]; }));
maxTemps.push(d3.max(data, function(d) {return d["90S-64S"]; }));

var maxTemp = d3.max(maxTemps);

var minYear = d3.min(data, function(d) {return d.Year; });
var maxYear = d3.max(data, function(d) {return d.Year; });

console.log(minYear);
console.log(maxYear);
console.log(minTemp);
console.log(maxTemp);

var parseDate = d3.timeParse("%Y");

var margin = {left:50,right:50,top:40,bottom:50};

var height = 600;
var width = 850;

var y = d3.scaleLinear()
            .domain([minTemp-10,maxTemp+10])
            .range([height-margin.bottom,0]);
var x = d3.scaleTime()
            .domain([parseDate(minYear), parseDate(maxYear)])
            .range([0,width-margin.left]);

var yAxis = d3.axisLeft(y).ticks(10).tickPadding(10).tickSize(10);
var xAxis = d3.axisBottom(x).ticks(45).tickPadding(0).tickSize(3);
var global_lat = d3.line()
  .x(function(d) { return x(parseDate(d.Year)); })
  .y(function(d) { return y(d.Glob); });
var latitude64n_90n = d3.line()
  .x(function(d) { return x(parseDate(d.Year)); })
  .y(function(d) { return y(d["64N-90N"]); });
var latitude44n_64n = d3.line()
  .x(function(d) { return x(parseDate(d.Year)); })
  .y(function(d) { return y(d["44N-64N"]); });
var latitude24n_44n = d3.line()
  .x(function(d) { return x(parseDate(d.Year)); })
  .y(function(d) { return y(d["24N-44N"]); });
var latitudeequ_24n = d3.line()
  .x(function(d) { return x(parseDate(d.Year)); })
  .y(function(d) { return y(d["EQU-24N"]); });
var latitude24s_equ = d3.line()
  .x(function(d) { return x(parseDate(d.Year)); })
  .y(function(d) { return y(d["24S-EQU"]); });
var latitude44s_24s = d3.line()
  .x(function(d) { return x(parseDate(d.Year)); })
  .y(function(d) { return y(d["44S-24S"]); });
var latitude64s_44s = d3.line()
  .x(function(d) { return x(parseDate(d.Year)); })
  .y(function(d) { return y(d["64S-44S"]); });
var latitude90s_64s = d3.line()
  .x(function(d) { return x(parseDate(d.Year)); })
  .y(function(d) { return y(d["90S-64S"]); });

var area = d3.area()
                .x(function(d,i){ return i*20; })
                .y0(height)
                .y1(function(d){ return y(d); });

var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");
var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

var doublemarginleft = margin.left * 2;

svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("id", "global")
  .attr("d", global_lat)
  .attr("transform","translate("+doublemarginleft+","+margin.top+")");
svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("id", "line64n-90n")
  .attr("d", latitude64n_90n)
  .attr("transform","translate("+doublemarginleft+","+margin.top+")");
svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("id", "line44n-64n")
  .attr("d", latitude44n_64n)
  .attr("transform","translate("+doublemarginleft+","+margin.top+")");
svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("id", "line24n-44n")
  .attr("d", latitude24n_44n)
  .attr("transform","translate("+doublemarginleft+","+margin.top+")");
svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("id", "lineequ-24n")
  .attr("d", latitudeequ_24n)
  .attr("transform","translate("+doublemarginleft+","+margin.top+")");
svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("id", "line24s-equ")
  .attr("d", latitude24s_equ)
  .attr("transform","translate("+doublemarginleft+","+margin.top+")");
svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("id", "line44s-24s")
  .attr("d", latitude44s_24s)
  .attr("transform","translate("+doublemarginleft+","+margin.top+")");
svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("id", "line64s-44s")
  .attr("d", latitude64s_44s)
  .attr("transform","translate("+doublemarginleft+","+margin.top+")");
svg.append("path")
  .data([data])
  .attr("class", "line")
  .attr("id", "line90s-64s")
  .attr("d", latitude90s_64s)
  .attr("transform","translate("+doublemarginleft+","+margin.top+")")
  .on("mouseover",function(d){ this.style.strokeWidth = 5; })
  .on("mouseout",function(d){ this.style.strokeWidth = .5; });

console.log(height);

var height_adjust = height - margin.bottom;

chartGroup.append("path").attr("d",area(data));
chartGroup.append("g")
      .attr("class","axis y")
      .attr("transform", "translate("+margin.left+",0)")
      .call(yAxis);
chartGroup.append("g")
      .attr("class", "axis x")
      .attr("transform", "translate("+margin.left+","+height_adjust+")")
      .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-90)");

//svg.select("g").attr("transform", "translate("+margin.left+",0)")


// text label for the x axis
svg.append("text")
    .attr("transform",
          "translate(" + (width/2 + doublemarginleft) + " ," +
                         (height + margin.top) + ")")
    .style("text-anchor", "middle")
    .text("Year");

// text label for the y axis
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", margin.left-10)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Value");

var legendpositionleft = doublemarginleft + 20;
var legendpositiontop = margin.top + 20;

var legend = svg.append("rect")
        .attr("height", 140)
        .attr("width", 150)
        .attr("transform", "translate("+legendpositionleft+","+legendpositiontop+")")
        .style("stroke", "gray")
        .style("fill", "none");

var line1 = svg.append("line")
        .attr("x1", 130)
        .attr("x2", 150)
        .attr("y1", 70)
        .attr("y2", 70)
        .style("stroke", "rgb(153, 115, 0)")
        .style("strokeWidth", ".5");
var line2 = svg.append("line")
        .attr("x1", 130)
        .attr("x2", 150)
        .attr("y1", 85)
        .attr("y2", 85)
        .style("stroke", "red")
        .style("strokeWidth", ".5");
var line3 = svg.append("line")
        .attr("x1", 130)
        .attr("x2", 150)
        .attr("y1", 100)
        .attr("y2", 100)
        .style("stroke", "blue")
        .style("strokeWidth", ".5");
var line4 = svg.append("line")
        .attr("x1", 130)
        .attr("x2", 150)
        .attr("y1", 115)
        .attr("y2", 115)
        .style("stroke", "orange")
        .style("strokeWidth", ".5");
var line5 = svg.append("line")
        .attr("x1", 130)
        .attr("x2", 150)
        .attr("y1", 130)
        .attr("y2", 130)
        .style("stroke", "cyan")
        .style("strokeWidth", ".5");
var line6 = svg.append("line")
        .attr("x1", 130)
        .attr("x2", 150)
        .attr("y1", 145)
        .attr("y2", 145)
        .style("stroke", "purple")
        .style("strokeWidth", ".5");
var line7 = svg.append("line")
        .attr("x1", 130)
        .attr("x2", 150)
        .attr("y1", 160)
        .attr("y2", 160)
        .style("stroke", "black")
        .style("strokeWidth", ".5");
var line8 = svg.append("line")
        .attr("x1", 130)
        .attr("x2", 150)
        .attr("y1", 175)
        .attr("y2", 175)
        .style("stroke", "yellow")
        .style("strokeWidth", ".5");
var line9 = svg.append("line")
        .attr("x1", 130)
        .attr("x2", 150)
        .attr("y1", 190)
        .attr("y2", 190)
        .style("stroke", "gray")
        .style("strokeWidth", ".5");

var text1 = svg.append("text")
        .attr("y", 75)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("Global");
var text2 = svg.append("text")
        .attr("y", 90)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("90N - 64N");
var text3 = svg.append("text")
        .attr("y", 105)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("64N - 44N");
var text4 = svg.append("text")
        .attr("y", 120)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("44N - 24N");
var text5 = svg.append("text")
        .attr("y", 135)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("24N - Equator");
var text6 = svg.append("text")
        .attr("y", 150)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("Equator - 24S");
var text7 = svg.append("text")
        .attr("y", 165)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("24S - 44S");
var text8 = svg.append("text")
        .attr("y", 180)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("44S - 64S");
var text9 = svg.append("text")
        .attr("y", 195)
        .attr("x", 160)
        .style("text-anchor", "start")
        .style("font-family", "Monospace")
        .text("64S - 90S");
