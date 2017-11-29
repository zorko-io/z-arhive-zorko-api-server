import test from 'ava'
import {matchGlob} from './matchGlob'

test('match globs', async t => {
  t.true(matchGlob('blablalb/', 'blablalb/'))
  t.true(matchGlob('bar/*.zzz.fg', 'bar/yyyy.zzz.fg'))
})

test('doesn`t match globs', async t => {
  t.false(matchGlob('blablab/', 'blablalb'))
  t.false(matchGlob('bar/*.zzz.fg', 'bar/mar/yyyy.zzz.fg'))
})

test('doesn`t match on falsy params', t => {
  t.false(matchGlob(null, 'blablalb'))
  t.false(matchGlob('bar/*.zzz.fg', null))
})
