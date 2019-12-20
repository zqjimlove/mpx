import { redefine } from '../redefine'
import notARegExp from 'core-js-pure/internals/not-a-regexp'
import requireObjectCoercible from 'core-js-pure/internals/require-object-coercible'
import toLength from 'core-js-pure/internals/to-length'

var nativeEndsWith = ''.endsWith
var min = Math.min

redefine(String, 'endsWith', function (searchString) {
  var that = String(requireObjectCoercible(this))
  notARegExp(searchString)
  var endPosition = arguments.length > 1 ? arguments[1] : undefined
  var len = toLength(that.length)
  var end = endPosition === undefined ? len : min(toLength(endPosition), len)
  var search = String(searchString)
  return nativeEndsWith ? nativeEndsWith.call(that, search, end) : that.slice(end - search.length, end) === search
})
