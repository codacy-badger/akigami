import { create as renderer } from 'react-test-renderer';
import createTestContext from 'react-cosmos-test/generic';
import Avatar from './Avatar.fixture';

Avatar.forEach((fixture) => {
  const res = createTestContext({ renderer, fixture });
  beforeEach(res.mount);
  test(`Avatar ${fixture.name} snapshot`, () => {
    expect(res.getWrapper().toJSON()).toMatchSnapshot();
  });
});

