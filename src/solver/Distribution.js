
function Distribution(solver) {
  var distribution = function(x,y,z,w,h,d) {
    return solver.render(x,y,z,w,h,d);
  }
  distribution.solver = solver;
  return distribution;
}

export default Distribution;
