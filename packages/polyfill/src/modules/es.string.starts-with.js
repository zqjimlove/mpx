import { redefine } from '../redefine'
import notARegExp from 'core-js-pure/internals/not-a-regexp'
import requireObjectCoercible from 'core-js-pure/internals/require-object-coercible'
import toLength from 'core-js-pure/internals/to-length'

var nativeStartsWith = ''.startsWith
var min = Math.min

redefine(String, 'startsWith', function (searchString) {
  var that = String(requireObjectCoercible(this))
  notARegExp(searchString)
  var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length))
  var search = String(searchString)
  return nativeStartsWith
    ? nativeStartsWith.call(that, search, index)
    : that.slice(index, index + search.length) === search
})
