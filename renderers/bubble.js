import marked from 'marked'

export default {
  render: ({desc, dataset, graphData, unfilteredDatasetSize}) => {
    return `
        <style>
          body {  
            background: #293950;
            color: #ecf0f0;
          }
          circle {
            color: gray;
          }

          a[href]:not(#boost), 
          text {
            color: white;
          }

          svg { width: 100%; margin: 1rem auto; }

        </style>
        <main>
          ${marked(desc)}
          <hr>
          <section id="graph"></section>
        </main>  
        <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3.min.js"></script>
        <script>
          //(function() {dataset

      var sourceData = ${JSON.stringify(dataset)}
      // Fake JSON data
      var json = {"data": ${JSON.stringify(graphData)}}

      // D3 Bubble Chart 

      var colorCircles = d3.scale.category10();

      var diameter = Math.max(window.innerWidth, window.innerHeight);

      var svg = d3.select('#graph').append('svg')
              .attr('width', diameter)
              .attr('height', diameter)

      var tooltip = d3.select('#graph')
              .append("div")
               .style("position", "absolute")
               .style("visibility", "hidden")
               .style("color", "white")
               .style("padding", "8px")
               .style("background-color", "#626D71")
               .style("border-radius", "6px")
               .style("text-align", "center")
               .style("font-family", "monospace")
               .style("width", "400px")
               .text("")
    ;


      var bubble = d3.layout.pack()
            .size([diameter, diameter])
            .value(function(d) {return d.size;})
            .padding(3);

      // generate data with calculated layout values
      var nodes = bubble.nodes(processData(json))
                .filter(function(d) { return !d.children; }); // filter out the outer bubble

      var vis = svg.selectAll('circle')
              .data(nodes);

      vis.enter().append('circle')
          .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
          .attr('r', function(d) { return d.r; })
          .attr('class', function(d) { return d.className; })
          .style("fill", function(d) { return colorCircles(d.className)})
          .on("mouseover", function(d){
               tooltip.html(d.className+"<br>frequency: "+ sourceData.find(rec => rec.tag==d.name).frequency.toLocaleString()); 
               return tooltip.style("visibility", "visible");})
             .on("mousemove", function(){
               return tooltip.style("top", (d3.event.pageY-       10)+"px").style("left",(d3.event.pageX+10)+"px");
            })
           .on("click", function(d) {
              window.location.href = sourceData.find(rec => rec.tag==d.name).url
            })
           .on("mouseout", function(){
              return tooltip.style("visibility", "hidden");
            })
            .text(function (d) {
              return d.className
            })

        svg.selectAll('text')
            .data(bubble.nodes(processData(json)))
            .enter()
            .append("text")
            .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
            .attr({
                "text-anchor": "middle",
                "font-color": "white", 
                "font-size": function(d, i) {
                  
                  let size = json.data[(sourceData[i]||{}).tag] || 1
                  return size - (size/2);
                },
                "dy": function(d) {
                  return d.r / ((d.r * 25) / 100);
                }
              })        
            .text( function (d) { 
              return d.name  
              })


      function processData(data) {
        var obj = data.data;

        var newDataSet = [];

        for(var prop in obj) {
          newDataSet.push({name: prop, className: prop.toLowerCase(), size: obj[prop]});
        }
        return {children: newDataSet};
      }

    //})();</script>`
  }
}