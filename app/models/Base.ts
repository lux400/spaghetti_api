import { Model, snakeCaseMappers, compose } from 'objection';
import visibilityPlugin from 'objection-visibility';

const mixins = compose(visibilityPlugin);

export default class Base extends mixins(Model) {
  static columnNameMappers = snakeCaseMappers();
}
