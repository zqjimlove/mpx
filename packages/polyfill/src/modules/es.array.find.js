import { redefine } from '../redefine'
import find from 'core-js-pure/internals/array-iteration'

redefine(Array, 'find', function (callbackfn) {
  return find.find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
})
