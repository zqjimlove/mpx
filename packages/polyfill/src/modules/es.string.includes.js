import { redefine } from '../redefine'
import notARegExp from 'core-js-pure/internals/not-a-regexp'
import requireObjectCoercible from 'core-js-pure/internals/require-object-coercible'

redefine(String, 'includes', function (searchString) {
  return !!~String(requireObjectCoercible(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined)
})
