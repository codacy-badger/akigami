const statuses = ['watching', 'completed', 'planned', 'dropped', 'paused'];

test('in statuses has completed on it', () => {
  expect(statuses).toContain('completed');
});
