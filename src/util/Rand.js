
import Seedrandom from '../../node_modules/seedrandom/seedrandom';

export default class Rand {
  
  constructor(seed) {
    var rng = new Seedrandom(seed);

    function result() {
      var thisRng = rng;
      if(arguments[0]) {
        thisRng = new Seedrandom(arguments[0] + " " + seed);
      }
      return thisRng();
    }

    return result;
  }

}
