
function extend(target, vals) {
  if (target && vals) {
    for (var prop in vals) {
      if (vals[prop] && typeof vals[prop] === "object") {
        if (typeof target[prop] !== "object") {
          target[prop] = {};
        }
        extend(target[prop], vals[prop]);
      } else {
        target[prop] = vals[prop];
      }
    }
  }
  return target;
}

export default extend;
