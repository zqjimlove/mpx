import { redefine } from '../redefine'
import createIteratorConstructor from 'core-js-pure/internals/create-iterator-constructor'
import requireObjectCoercible from 'core-js-pure/internals/require-object-coercible'
import toLength from 'core-js-pure/internals/to-length'
import aFunction from 'core-js-pure/internals/a-function'
import anObject from 'core-js-pure/internals/an-object'
import classof from 'core-js-pure/internals/classof'
import isRegExp from 'core-js-pure/internals/is-regexp'
import getRegExpFlags from 'core-js-pure/internals/regexp-flags'
import createNonEnumerableProperty from 'core-js-pure/internals/create-non-enumerable-property'
import fails from 'core-js-pure/internals/fails'
import wellKnownSymbol from 'core-js-pure/internals/well-known-symbol'
import speciesConstructor from 'core-js-pure/internals/species-constructor'
import advanceStringIndex from 'core-js-pure/internals/advance-string-index'
import InternalStateModule from 'core-js-pure/internals/internal-state'
import IS_PURE from 'core-js-pure/internals/is-pure'

var MATCH_ALL = wellKnownSymbol('matchAll')
var REGEXP_STRING = 'RegExp String'
var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator'
var setInternalState = InternalStateModule.set
var getInternalState = InternalStateModule.getterFor(REGEXP_STRING_ITERATOR)
var RegExpPrototype = RegExp.prototype
var regExpBuiltinExec = RegExpPrototype.exec
var nativeMatchAll = ''.matchAll

var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails(function () {
  'a'.matchAll(/./)
})

var regExpExec = function (R, S) {
  var exec = R.exec
  var result
  if (typeof exec === 'function') {
    result = exec.call(R, S)
    if (typeof result !== 'object') throw TypeError('Incorrect exec result')
    return result
  } return regExpBuiltinExec.call(R, S)
}

// eslint-disable-next-line max-len
var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, global, fullUnicode) {
  setInternalState(this, {
    type: REGEXP_STRING_ITERATOR,
    regexp: regexp,
    string: string,
    global: global,
    unicode: fullUnicode,
    done: false
  })
}, REGEXP_STRING, function next() {
  var state = getInternalState(this)
  if (state.done) return { value: undefined, done: true }
  var R = state.regexp
  var S = state.string
  var match = regExpExec(R, S)
  if (match === null) {
    state.done = true
    return { value: undefined, done: state.done }
  }
  if (state.global) {
    if (String(match[0]) === '') R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode)
    return { value: match, done: false }
  }
  state.done = true
  return { value: match, done: false }
})

var $matchAll = function (string) {
  var R = anObject(this)
  var S = String(string)
  var C, flagsValue, flags, matcher, global, fullUnicode
  C = speciesConstructor(R, RegExp)
  flagsValue = R.flags
  if (flagsValue === undefined && R instanceof RegExp && !('flags' in RegExpPrototype)) {
    flagsValue = getRegExpFlags.call(R)
  }
  flags = flagsValue === undefined ? '' : String(flagsValue)
  matcher = new C(C === RegExp ? R.source : R, flags)
  global = !!~flags.indexOf('g')
  fullUnicode = !!~flags.indexOf('u')
  matcher.lastIndex = toLength(R.lastIndex)
  return new $RegExpStringIterator(matcher, S, global, fullUnicode)
}

redefine(String, 'matchAll', function (regexp) {
  var O = requireObjectCoercible(this)
  var flags, S, matcher, rx
  if (regexp != null) {
    if (isRegExp(regexp)) {
      flags = String(requireObjectCoercible('flags' in RegExpPrototype
        ? regexp.flags
        : getRegExpFlags.call(regexp)
      ))
      if (!~flags.indexOf('g')) throw TypeError('`.matchAll` does not allow non-global regexes')
    }
    if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments)
    matcher = regexp[MATCH_ALL]
    if (matcher === undefined && IS_PURE && classof(regexp) === 'RegExp') matcher = $matchAll
    if (matcher != null) return aFunction(matcher).call(regexp, O)
  } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll.apply(O, arguments)
  S = String(O)
  rx = new RegExp(regexp, 'g')
  return IS_PURE ? $matchAll.call(rx, S) : rx[MATCH_ALL](S)
})

IS_PURE || MATCH_ALL in RegExpPrototype || createNonEnumerableProperty(RegExpPrototype, MATCH_ALL, $matchAll)
