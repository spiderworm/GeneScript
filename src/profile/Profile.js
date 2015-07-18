
import Block3D from 'es6!../block/Block3D';
import Node3D from 'es6!../node/Node3D';
import Distribution from 'es6!../solver/Distribution';
import SimplexCubeMeshSolver from 'es6!../solver/SimplexCubeMeshSolver';
import SingleObject3DSolver from 'es6!../solver/SingleObject3DSolver';

export default class Profile {

  constructor(registry,seed,vals) {
    this._registry = registry;
    this._seed = seed;
    this._vals = vals;
    this._profiles = {};
    for (var id in vals.objects) {
      var profileConfig = registry.getProfileConfig(vals.objects[id]);
      this._profiles[id] = new Profile(registry, this._seed + id, profileConfig);
    }
    this._shape = vals.shape;
    this._color = vals.color;
    this._size = vals.size || 1;
    this._scale = vals.scale || 1;
    this._range = vals.range || .5;
    this._negRange = -this._range;
    this._doubleRange = 2 * this._range;

    var solver;
    if (vals.distribution && vals.distribution.type) {
      switch(vals.distribution.type) {
        case "SimplexCubeMeshSolver":
          solver = new SimplexCubeMeshSolver(this._seed, vals.distribution);
        break;
      }
    }
    if (!solver) {
      solver = new SingleObject3DSolver(
        vals.x || 0,
        vals.y || 0,
        vals.z || 0,
        1
      );
    }
    this._distribution = new Distribution(solver);
  }

  get seed() { return this._seed; }
  get profiles() { return this._profiles; }
  get distribution() { return this._distribution; }
  get shape() { return this._shape; }
  get color() { return this._color; }
  get size() { return this._size; }
  get scale() { return this._scale; }
  get range() { return this._range; }
  get negRange() { return this._negRange; }
  get doubleRange() { return this._doubleRange; }

}

var nodesCount = 0;