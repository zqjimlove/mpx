import { redefine } from '../redefine'
import flattenIntoArray from 'core-js-pure/internals/flatten-into-array'
import toObject from 'core-js-pure/internals/to-object'
import toLength from 'core-js-pure/internals/to-length'
import aFunction from 'core-js-pure/internals/a-function'
import arraySpeciesCreate from 'core-js-pure/internals/array-species-create'

redefine(Array, 'flatMap', function (callbackfn) {
  var O = toObject(this)
  var sourceLen = toLength(O.length)
  var A
  aFunction(callbackfn)
  A = arraySpeciesCreate(O, 0)
  A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
  return A
})
