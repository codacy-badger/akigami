import { create as renderer } from 'react-test-renderer';
import createTestContext from 'react-cosmos-test/generic';
import Block from './Block.fixture';

Block.forEach((fixture) => {
  const res = createTestContext({ renderer, fixture });
  beforeEach(res.mount);
  test(`Block ${fixture.name} snapshot`, () => {
    expect(res.getWrapper().toJSON()).toMatchSnapshot();
  });
});

