
function Distribution(solver) {
  return function(x,y,z,w,h,d) {
    return solver.getNodesInArea(x,y,z,w,h,d);
  }
}

export default Distribution;
