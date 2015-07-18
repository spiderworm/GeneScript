
import World3D from 'es6!./World3D';

export default class WorldFactory {
  
  static getWorld(config) {
    for(var i=0; i<this._worlds.length; i++) {
      if (this._worlds[i].config === config) {
        return this._worlds[i].world;
      }
    }

    var world = new World3D(config);
    this._worlds.push({
      config: config,
      world: world
    });

    return world;
  }

}

WorldFactory._worlds = [];
