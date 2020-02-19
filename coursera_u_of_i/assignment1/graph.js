//var dataArray = [25,26,28,32,37,45,55,70,90,120,135,150,160,168,172,177,180];
//var dataYears = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];

var minTemps = [];
var maxTemps = [];

minTemps.push(d3.min(data, function(d) {return d.Jan; }));
minTemps.push(d3.min(data, function(d) {return d.Feb; }));
minTemps.push(d3.min(data, function(d) {return d.Mar; }));
minTemps.push(d3.min(data, function(d) {return d.Apr; }));
minTemps.push(d3.min(data, function(d) {return d.May; }));
minTemps.push(d3.min(data, function(d) {return d.Jun; }));
minTemps.push(d3.min(data, function(d) {return d.Jul; }));
minTemps.push(d3.min(data, function(d) {return d.Aug; }));
minTemps.push(d3.min(data, function(d) {return d.Sep; }));
minTemps.push(d3.min(data, function(d) {return d.Oct; }));
minTemps.push(d3.min(data, function(d) {return d.Nov; }));
minTemps.push(d3.min(data, function(d) {return d.Dec; }));

var minTemp = d3.min(minTemps);

maxTemps.push(d3.max(data, function(d) {return d.Jan; }));
maxTemps.push(d3.max(data, function(d) {return d.Feb; }));
maxTemps.push(d3.max(data, function(d) {return d.Mar; }));
maxTemps.push(d3.max(data, function(d) {return d.Apr; }));
maxTemps.push(d3.max(data, function(d) {return d.May; }));
maxTemps.push(d3.max(data, function(d) {return d.Jun; }));
maxTemps.push(d3.max(data, function(d) {return d.Jul; }));
maxTemps.push(d3.max(data, function(d) {return d.Aug; }));
maxTemps.push(d3.max(data, function(d) {return d.Sep; }));
maxTemps.push(d3.max(data, function(d) {return d.Oct; }));
maxTemps.push(d3.max(data, function(d) {return d.Nov; }));
maxTemps.push(d3.max(data, function(d) {return d.Dec; }));

var maxTemp = d3.min(maxTemps);

var minYear = d3.min(data, function(d) {return d.Year; });
var maxYear = d3.max(data, function(d) {return d.Year; });

console.log(minYear);
console.log(maxYear);

var parseDate = d3.timeParse("%Y");


var height = 500;
var width = 750;

var margin = {left:50,right:50,top:40,bottom:50};

var y = d3.scaleLinear()
            .domain([minTemp,maxTemp])
            .range([height,0]);
var x = d3.scaleTime()
            .domain([parseDate(minYear), parseDate(maxYear)])
            .range([0,width]);

var yAxis = d3.axisLeft(y).ticks(10).tickPadding(10).tickSize(10);
var xAxis = d3.axisBottom(x).ticks(10).tickPadding(10).tickSize(10);

var area = d3.area()
                .x(function(d,i){ return i*20; })
                .y0(height)
                .y1(function(d){ return y(d); });
var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");
var chartGroup = svg.append("g").attr("transform","translate("+margin.left+","+margin.top+")");

chartGroup.append("path").attr("d",area(data));
chartGroup.append("g")
      .attr("class","axis y")
      .call(yAxis);
chartGroup.append("g")
      .attr("class", "axis x")
      .attr("transform", "translate(0,"+height+")")
      .call(xAxis);
