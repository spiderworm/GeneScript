
let primitiveUtil = {

  getNumber: function() {
    for(var i=0; i<arguments.length; i++) {
      if(typeof arguments[i] === "number") {
        return arguments[i];
      }
    }
  }

};

export default primitiveUtil;