
import extend from 'es6!../util/extend';

export default class Registry {
  
  constructor(vals) {
    this._vals = {

      profiles: {},

      solvers: {
        Mesh3D: {
          algorithm: "SquareMesh3D",
          nodeDistance: 1,
          nodeScatter: 0
        },
        Simplex3D: {
          algorithm: "Simplex3D",
          scale: 1
        }
      },

      distributions: {
        SimplexMesh3D: {
          solver: {
            base: "Mesh3D"
          },
          mask: {
            solver: "Simplex3D",
            strength: 0
          }
        }
      },

      shapes: {
        Sphere: {}
      }

    };
    this.extend(vals);
  }

  extend(vals) {
    extend(this._vals,vals);
  }

  get seed() { return this._vals.seed; }

  get profiles() { return this._vals.profiles; }

  get distributions() { return this._vals.distributions; }

  get shapes() { return this._vals.shapes; }

  get solvers() { return this._vals.solvers; }

  get config() { return this._vals; }

  static clone(registry) {
    var vals = extend({},registry.config);
    registry = new Registry(vals);
    return registry;
  }

}