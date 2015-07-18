
import BlockCollection from 'es6!./BlockCollection';
import Block3D from 'es6!./Block3D';

export default class Block3DCollection extends BlockCollection {
  
  getByPosition(x,y,z) {
    return this.get(Block3D.createID(x,y,z));
  }

}
