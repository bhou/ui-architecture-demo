import * as d3 from 'd3';
import CollarView from '../abstraction/CollarView';


module.exports = function(selector, name) {
  let counter = new CollarView(selector, name);

  let viewState = { value: [0, 1, 6, 1, 3, 7, 8, 9] }
  
  let margin = {top: 20, right: 20, bottom: 30, left: 50};
  let width = 800;
  let height = 300;


  let viewUpdater = function(state, done) {
    // update state
    viewState.value.push(state.count);

    let chart = d3.select(selector)
      .attr('width', width)
      .attr('height', height)
    
    let x = d3.scaleLinear()
      .domain([0, viewState.value.length]).range([0, width])
    let y = d3.scaleLinear()
      .domain([d3.min(viewState.value), d3.max(viewState.value)]).range([height, 0]);

    let valueline = d3.line()
      .x(function(d, i) { return x(i); })
      .y(function(d, i) { return y(d); });

    x.domain(d3.extent(viewState.value, function(d, i) { return i; }));
    y.domain([d3.min(viewState.value, function(d) { return d; }), d3.max(viewState.value, function(d) { return d; })]);

    
    chart.selectAll("path.line").remove();
    
    chart.append("path")
      .data([viewState.value])
      .attr("class", "line")
      .attr("d", valueline);  

    done();
  }


  counter.setRenderer(viewUpdater);
  counter.setUpdater(viewUpdater);
  
  return counter;
}
