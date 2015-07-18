
import Collection from 'es6!../util/Collection';

export default class SolverCollection extends Collection {

  add(id, solver) {
    if (!solver instanceof Solver) {
      solver = new Sovler(solver);
    }
    super.add(id, solver);
  }

}
