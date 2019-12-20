import { redefine } from '../redefine'
import trim from 'core-js-pure/internals/string-trim'
import forcedStringTrimMethod from 'core-js-pure/internals/forced-string-trim-method'
var FORCED = forcedStringTrimMethod('trimEnd')

var trimEnd = FORCED ? function trimEnd () {
  return trim.end(this)
} : ''.trimEnd

redefine(String, 'trimEnd', trimEnd)
redefine(String, 'trimRight', trimEnd)
