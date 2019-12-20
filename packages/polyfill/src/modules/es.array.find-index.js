import { redefine } from '../redefine'
import findIndex from 'core-js-pure/internals/array-iteration'

redefine(Array, 'findIndex', function (callbackfn) {
  return findIndex.findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
})
