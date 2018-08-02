import { create as renderer } from 'react-test-renderer';
import createTestContext from 'react-cosmos-test/generic';
import Categories from './Categories.fixture';

const res = createTestContext({ renderer, fixture: Categories });
beforeEach(res.mount);
test('Categories snapshot', () => {
  expect(res.getWrapper().toJSON()).toMatchSnapshot();
});

