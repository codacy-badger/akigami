import { create as renderer } from 'react-test-renderer';
import createTestContext from 'react-cosmos-test/generic';
import Blank from './Blank.fixture';

const res = createTestContext({ renderer, fixture: Blank });
beforeEach(res.mount);
test('Blank snapshot', () => {
  expect(res.getWrapper().toJSON()).toMatchSnapshot();
});

