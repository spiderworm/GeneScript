
import DevAPI from 'es6!./dev/DevAPI';

export default class GeneScriptApiFactory {

  static getApi(config) {
    var version = config && config.version ? config.version : this.DEFAULT;

    switch(version) {
      case this.DEV:
        return new DevAPI();
      break;
      default:
        throw new Error('API version not found: ' + version);
      break;
    }
  }

}

GeneScriptApiFactory.DEV = "dev";
GeneScriptApiFactory.DEFAULT = GeneScriptApiFactory.DEV;
