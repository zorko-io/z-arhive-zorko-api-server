import test from 'ava'
import {isWorkspaceContent} from './isWorkspaceContent'

test('match globs', async t => {
  t.true(isWorkspaceContent({path: 'looks', blblbl: 123}))
  t.true(isWorkspaceContent({path: 'models/cart/some.doc.md', blblbl: 123}))
})

test('doesn`t match globs', async t => {
  t.false(isWorkspaceContent({}))
  t.false(isWorkspaceContent('bar/*.zzz.fg', 'bar/mar/yyyy.zzz.fg'))
  t.false(isWorkspaceContent())
})
