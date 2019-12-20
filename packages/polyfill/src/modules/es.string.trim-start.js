import { redefine } from '../redefine'
import trim from 'core-js-pure/internals/string-trim'
import forcedStringTrimMethod from 'core-js-pure/internals/forced-string-trim-method'
var FORCED = forcedStringTrimMethod('trimStart')

var trimStart = FORCED ? function trimStart () {
  return trim.start(this)
} : ''.trimStart

redefine(String, 'trimStart', trimStart)
redefine(String, 'trimLeft', trimStart)
