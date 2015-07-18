
import ThreeView71 from 'es6!./ThreeView71';
import ThreeView from 'es6!./ThreeView';

export default class ThreeViewFactory {
  
  static create(THREE, traveller, scale) {
    if(THREE.VERSION === "71") {
      return new ThreeView71(THREE, traveller, scale);
    }
    return new ThreeView(THREE, traveller, scale);
  }

}
