var height = 800;
var width = 2000;

var canvas = d3.select('#viz')
		.append('svg')
		.attr("height",height)
		.attr("width",width);

d3.csv("gdpData.csv",function(data){
	data.forEach(function(d){
		d.rgdpe_2014= +d.rgdpe_2014
		d.pop_2014= +d.pop_2014
	});

var gdpMin = d3.min(data, function(d){return d.rgdpe_2014;});

var gdpMax = d3.max(data, function(d){return d.rgdpe_2014;});

var popMin = d3.min(data, function(d){return d.pop_2014;});

var popMax = d3.max(data, function(d){return d.pop_2014;});

var avhMin = d3.min(data, function(d){return d.avh_2014;});

var avhMax = d3.max(data, function(d){return d.avh_2014;});

var empMin = d3.min(data, function(d){return d.emp_2014;});

var empMax = d3.max(data, function(d){return d.emp_2014;});

var gdpScale = d3.scaleLinear()
	.domain([gdpMin,gdpMax]).nice()
	.range([0,900]);

var popScale = d3.scaleLinear()
	.domain([popMax,popMin]).nice()
	.range([-40,height-120]);

var avhScale = d3.scaleLinear()
	.domain([(avhMin),(avhMax)])
	.range(["#d22828","#32bd07"]);

var widthScale = d3.scaleLinear()
	.domain([gdpMin,gdpMax]).nice()
	.range([0,600]);

var xAxis = d3.axisBottom()
	.scale(gdpScale);

var yAxis = d3.axisLeft()
	.scale(popScale);

var barAxis = d3.axisBottom()
	.scale(widthScale);

canvas.append("g")
	.call(xAxis)
	.attr("transform","translate(50,750)");

canvas.append("g")
	.call(yAxis)
	.attr("transform","translate(50,50)");

canvas.append("g")
	.call(barAxis)
	.attr("transform","translate(1200,750)");

var yLabel = canvas.append("text")
	.attr("x",55)
	.attr("y",20)
	.attr("font-family","Lucida Console")
	.attr("font-size",11)
	.text("Population (In Millions)");

var xLabel = canvas.append("text")
	.attr("x",850)
	.attr("y",740)
	.attr("font-family","Lucida Console")
	.attr("font-size",11)
	.text("GDP (In Millions)");

var xLabel2 = canvas.append("text")
	.attr("x",1700)
	.attr("y",740)
	.attr("font-family","Lucida Console")
	.attr("font-size",11)
	.text("GDP (In Millions)");


var scatter = canvas.selectAll("circle")
	.data(data)
	.enter()
		.append("circle")
		.attr("r",3)
		.attr("cx",function(d){return gdpScale(d.rgdpe_2014)})
		.attr("cy",function(d){return popScale(d.pop_2014)})
		.attr("fill","black")
		.attr("transform","translate(100,45)")
    .on('mouseover', function(d) {
    	d3.select("#detail #country").text(d.country).style("color","red");
    	d3.select("#detail #esgdp").text(d3.format("$,.0f")(d.rgdpe_2014*1000000)).style("color","red");
    	d3.select("#detail #popMil").text(d3.format(",.0f")(d.pop_2014*1000000)).style("color","red");
    	d3.select("#detail #avh").text(d3.format(".2f")(d.avh_2014)).style("color","red");
    	d3.select("#detail #country").style("visibility","visible");
    	d3.select("#detail #esgdp").style("visibility","visible");
    	d3.select("#detail #popMil").style("visibility","visible");
    	d3.select("#detail #avh").style("visibility","visible");
      d3.select(this)
        .transition()
        .duration(100)
        .attr('r', 10)
        .attr('fill', "black");
    })
    .on('mouseout', function(d) {
    	d3.select("#detail #country").style("visibility","hidden");
    	d3.select("#detail #esgdp").style("visibility","hidden");
    	d3.select("#detail #popMil").style("visibility","hidden");
    	d3.select("#detail #avh").style("visibility","hidden");
      d3.select(this)
        .transition()
        .duration(100)
        .attr('r', 3)
        .attr('fill', function(d) {return avhScale(d.avh_2014)});
    });

scatter.transition()
	.attr("fill",function(d) {return avhScale(d.avh_2014)})
	.duration(5000);

var bars = canvas.append("g")
	.selectAll("rect")
		.data(data.sort(function(a,b){return d3.descending(a.rgdpe_2014,b.rgdpe_2014)}).slice(0,25))
	.enter()
		.append("rect")
		.attr("height",25)
		.attr("width",0)
		.attr("x",1200)
		.attr("y",function(d,i){return i*30})
		.attr("fill",function(d) {return avhScale(d.avh_2014)})
    .on('mouseover', function(d) {
    	d3.select("#detail #country").text(d.country).style("color","red");
    	d3.select("#detail #esgdp").text(d3.format("$,.0f")(d.rgdpe_2014*1000000)).style("color","red");
    	d3.select("#detail #popMil").text(d3.format(",.0f")(d.pop_2014*1000000)).style("color","red");
    	d3.select("#detail #avh").text(d3.format(".2f")(d.avh_2014)).style("color","red");
    	d3.select("#detail #country").style("visibility","visible");
    	d3.select("#detail #esgdp").style("visibility","visible");
    	d3.select("#detail #popMil").style("visibility","visible");
    	d3.select("#detail #avh").style("visibility","visible");
      d3.select(this)
        .transition()
        .duration(100)
        .attr('width', function(d){return widthScale(d.rgdpe_2014)+10})
        .attr('fill', "black");
    })
    .on('mouseout', function(d) {
    	d3.select("#detail #country").style("visibility","hidden");
    	d3.select("#detail #esgdp").style("visibility","hidden");
    	d3.select("#detail #popMil").style("visibility","hidden");
    	d3.select("#detail #avh").style("visibility","hidden");
      d3.select(this)
        .transition()
        .duration(100)
        .attr('width', function(d){return widthScale(d.rgdpe_2014)})
        .attr('fill', function(d) {return avhScale(d.avh_2014)})

});

bars.transition()
	.attr("width",function(d){return widthScale(d.rgdpe_2014)})
	.duration(5000);

var text = canvas.append("g")
	.selectAll("text")
		.data(data.sort(function(a,b){return d3.descending(a.rgdpe_2014,b.rgdpe_2014)}).slice(0,25))
	.enter()
		.append("text")
		.text(function(d){return d.country})
		.attr("y",function(d,i){return i*30})
		.attr("transform","translate(1050,20)")
		.attr("font-family","Lucida Console")
		.attr("font-size",11)
		.attr("font-weight","bolder");
});























