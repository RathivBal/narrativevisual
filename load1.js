async function init() {



const margin = {top: 20, right: 120, bottom: 300, left: 50},
    svgWidth = 900,
    svgHeight = 600,
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

const chart = d3.select('#chart')
    .attr("width", svgWidth)
    .attr("height", svgHeight)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


const data = await d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/4_ThreeNum.csv");
var data1 = data.filter(function (d){return d["continent"] == "Asia";});

var allGroup = d3.map(data, function(d){return(d.continent)}).keys();

d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; })


	
var x=d3.scaleLinear()
.domain([0,50000])
.range([0,width]);

		chart.append("text")
		.attr("x",400)
		.attr("y",320)
		.style("text-anchor","middle")
		.text("GPD Per Capita");

chart.append("g")
.attr("transform","translate(0,"+ height +")")
.call(d3.axisBottom(x));


var y = d3.scaleLinear()
.domain([35,90])
.range([height,0]);



chart.append("text")
.attr("transform", "rotate(-90)")
.attr("y",0-margin.left)
.attr("x",0-(height/2))
.attr("dy", "1em")
.style("text-anchor","middle")
.text("Life Expectancy");

chart.append("g")
.call(d3.axisLeft(y));

var z=d3.scaleLinear()
.domain([200000,1310000000])
.range([1,40]);


var myColor = d3.scaleOrdinal().domain(data)
  .range(d3.schemePaired);


var keys = ["Asia", "Europe", "Africa", "Americas", "Oceanica"];

chart.selectAll("mydots")
  .data(keys)
  .enter()
  .append("circle")
    .attr("cx", width+40)
    .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d){ return myColor(d)});

// Add one dot in the legend for each name.
chart.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
    .attr("x", width+50)
    .attr("y", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .style("fill", function(d){ return myColor(d)})
    .text(function(d){ return d})
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle")



var circle = chart.append("g")
.selectAll("dot")
.data(data)
.enter()
.append("circle")
//.attr("class" , function(d){ return d.continent })
.attr("cx", function (d) {return x(d.gdpPercap);} )
.attr("cy", function (d) {return y(d.lifeExp);} )
.attr("r", function (d) {return z(d.pop);} )
.style("fill", function(d) {return myColor(d.continent);})
.style("opacity", "0.7")
.attr("stroke", "black")
.append('title')
.text(d => d.country)
.on('mouseover', function() {
     d3.select(this).attr('stroke', '#333').attr('stroke-width', 2);
    })
    .on('mouseout', function() {
         d3.select(this).attr('stroke', null);})

$("#to_step2").click(function() {
//console.log("test")

document.getElementById("eur_ck").checked = false;
document.getElementById("eur_ck").checked = false;
document.getElementById("af_ck").checked = false;
document.getElementById("am_ck").checked = false;
document.getElementById("oc_ck").checked = false;
chart.selectAll('circle').remove();

chart.selectAll("mydots")
  .data(keys)
  .enter()
  .append("circle")
    .attr("cx", width+40)
    .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d){ return myColor(d)});



var circle1 = chart.append("g")
.selectAll("circle")
.remove()
.data(data1)
.enter()
.append("circle")
//.attr("class" , function(d){ return d.continent })
.attr("cx", function (d) {return x(d.gdpPercap);} )
.attr("cy", function (d) {return y(d.lifeExp);} )
.attr("r", function (d) {return z(d.pop);} )
.style("fill", function(d) {return myColor(d.continent);})
.style("opacity", "0.7")
.attr("stroke", "black")
.append('title')
.text(d => d.country)
.on('mouseover', function() {
     d3.select(this).attr('stroke', '#333').attr('stroke-width', 2);
    })
    .on('mouseout', function() {
         d3.select(this).attr('stroke', null);}) ;

})

$("#to_step3").click(function() {
console.log("test")

document.getElementById("asia_ck").disabled=false;
document.getElementById("eur_ck").disabled=false;
document.getElementById("af_ck").disabled=false;
document.getElementById("am_ck").disabled=false;
document.getElementById("oc_ck").disabled=false;

document.getElementById("asia_ck").checked=true;	
document.getElementById("eur_ck").checked = true;
document.getElementById("eur_ck").checked = true;
document.getElementById("af_ck").checked = true;
document.getElementById("am_ck").checked = true;
document.getElementById("oc_ck").checked = true;

chart.selectAll('circle').remove();

chart.selectAll("mydots")
  .data(keys)
  .enter()
  .append("circle")
    .attr("cx", width+40)
    .attr("cy", function(d,i){ return 100 + i*25}) // 100 is where the first dot appears. 25 is the distance between dots
    .attr("r", 7)
    .style("fill", function(d){ return myColor(d)});



var circle2 = chart.append("g")
.selectAll("circle")
.remove()
.data(data)
.enter()
.append("circle")
.attr("class" , function(d){ return d.continent })
.attr("cx", function (d) {return x(d.gdpPercap);} )
.attr("cy", function (d) {return y(d.lifeExp);} )
.attr("r", function (d) {return z(d.pop);} )
.style("fill", function(d) {return myColor(d.continent);})
.style("opacity", "0.7")
.attr("stroke", "black")
.append('title')
.text(d => d.country)
.on('mouseover', function() {
     d3.select(this).attr('stroke', '#333').attr('stroke-width', 2);
    })
    .on('mouseout', function() {
         d3.select(this).attr('stroke', null);}) 

});

 function update(){

      // For each check box:
      d3.selectAll(".checkbox").each(function(d){
        cb = d3.select(this);
        grp = cb.property("value")

        // If the box is check, I show the group
        if(cb.property("checked")){
          chart.selectAll("."+grp).transition().duration(1000).style("opacity", 1).attr("r", function(d){ return z(d.pop) })

        // Otherwise I hide it
        }else{
          chart.selectAll("."+grp).transition().duration(1000).style("opacity", 0).attr("r", 0)
        }
      })
    }

    // When a button change, I run the update function
    d3.selectAll(".checkbox").on("change",update);

    // And I initialize it at the beginning
    update()
function show(step){
    $(step).show();
}

function hide(step){
    $(step).hide();
}

}
