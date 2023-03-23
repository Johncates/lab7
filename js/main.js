const data = [
    {country:"Austria", city:"Vienna", population:1826030, x:386, y:296, eu:true},
    {country:"Belgium", city:"Brussels", population:166497, x:251, y:240, eu:true},
    {country:"Bulgaria", city:"Sofia", population:1316557, x:482, y:385, eu:true},
    {country:"Croatia", city:"Zagreb", population:795505, x:382, y:337, eu:true},
    {country:"Cyprus", city:"Nicosia", population:200452, x:649, y:499, eu:true},
    {country:"Czech Republic", city:"Prague", population:1259079, x:360, y:259, eu:true},
    {country:"Denmark", city:"Copenhagen", population:583525, x:345, y:162, eu:true},
    {country:"Estonia", city:"Tallinn", population:439286, x:462, y:89, eu:true},
    {country:"Finland", city:"Helsinki", population:620031, x:458, y:71, eu:true},
    {country:"France", city:"Paris", population:2241346, x:271, y:271, eu:true},
    {country:"Germany", city:"Berlin", population:3469849, x:352, y:215, eu:true},
    {country:"Greece", city:"Athens", population:664046, x:499, y:472, eu:true},
    {country:"Hungary", city:"Budapest", population:1754000, x:419, y:305, eu:true},
    {country:"Ireland", city:"Dublin", population:527612, x:147, y:169, eu:true},
    {country:"Italy", city:"Rome", population:2872021, x:338, y:407, eu:true},
    {country:"Japan", city:"Tokyo", population:9233460, x:0, y:0, eu:false},
    {country:"Latvia", city:"Riga", population:643368, x:457, y:133, eu:true},
    {country:"Lithuania", city:"Vilinus", population:532261, x:478, y:174, eu:true},
    {country:"Luxembourg", city:"Luxembourg", population:107247, x:267, y:261, eu:true},
    {country:"Malta", city:"Valletta", population:6444, x:362, y:518, eu:true},
    {country:"Netherlands", city:"Amsterdam", population:809892, x:260, y:210, eu:true},
    {country:"New Zealand", city:"Wellington", population:398300, x:0, y:0, eu:false},
    {country:"Poland", city:"Warsaw", population:1735442, x:434, y:221, eu:true},
    {country:"Portugal", city:"Lisbon", population:509312, x:30, y:408, eu:true},
    {country:"Romania", city:"Bucharest", population:1883425, x:516, y:348, eu:true},
    {country:"Slovakia", city:"Bratislava", population:491061, x:396, y:293, eu:true},
    {country:"Slovenia", city:"Ljubljana", population:277554, x:364, y:333, eu:true},
    {country:"Spain", city:"Madrid", population:3165235, x:104, y:401, eu:true},
    {country:"Sweden", city:"Stockholm", population:911989, x:400, y:93, eu:true},
    {country:"United Kingdom", city:"London", population:8538689, x:204, y:219, eu:true},
    {country:"USA", city:"New York City", population:8406000, x:0, y:0, eu:false}


]

const svg = d3.select("body")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 1000)

svg.selectAll("circle")
    .data(data).enter()
    .append("circle")
    .attr("cx", function(d) {return d.x})
    .attr("cy", function(d) {return d.y})
    .attr("r", function(d) {
        if (d.population < 1000000) {
            return 4
        }
        else (d.population > 1000000); {
            return 8}


    })
    .attr("fill", function(d) {
        return "rgb("+d.x+","+d.y+",0)"
    })

svg.selectAll("text")
    .data(data).enter()
    .append("text")
    .attr("x", function(d) {return d.x+10})
    .attr("y", function(d) {return d.y+4})
    .text(function(d) {return d.city})
    .attr("font-size", "11px");

var xScale = d3.scaleLinear()
    .domain([0, 800])
    .range([0, 800]);
var yScale = d3.scaleLinear()
    .domain([0, 600])
    .range([0, 600]);

var colorScale = d3.scaleOrdinal()
    .domain([true, false])
    .range(["blue", "green"]);

var circles = svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(d.x); })
    .attr("cy", function(d) { return yScale(d.y); })
    .attr("r", function(d) { return Math.sqrt(d.population / Math.PI); })
    .style("fill", function(d) { return colorScale(d.eu); });

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("transform", "translate(0, 600)")
    .call(xAxis);
svg.append("g")
    .call(yAxis);
d3.select("body")
    .append("button")
    .text("Add Knoxville")
    .on("click", function() {

        data.push({country: "United States", city: "Knoxville", population: 186173, x: 150, y: 350, eu: false});

        circles = svg.selectAll("circle")
            .data(data);
        circles.enter()
            .append("circle")
            .merge(circles)
            .attr("cx", function(d) { return xScale(d.x); })
            .attr("cy", function(d) { return yScale(d.y); })
            .attr("r", function(d) { return Math.sqrt(d.population / Math.PI); })
            .style("fill", function(d) { return d.city === "Knoxville" ? "red" : colorScale(d.eu); });
        circles.exit().remove();
    });
