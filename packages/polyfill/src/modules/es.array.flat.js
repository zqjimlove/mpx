import { redefine } from '../redefine'
import flattenIntoArray from 'core-js-pure/internals/flatten-into-array'
import toObject from 'core-js-pure/internals/to-object'
import toLength from 'core-js-pure/internals/to-length'
import toInteger from 'core-js-pure/internals/to-integer'
import arraySpeciesCreate from 'core-js-pure/internals/array-species-create'

redefine(Array, 'flat', function () {
  var depthArg = arguments.length ? arguments[0] : undefined
  var O = toObject(this)
  var sourceLen = toLength(O.length)
  var A = arraySpeciesCreate(O, 0)
  A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg))
  return A
})
