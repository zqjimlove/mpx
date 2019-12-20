import { redefine } from '../redefine'
import repeat from 'core-js-pure/internals/string-repeat'

redefine(String, 'repeat', repeat)
