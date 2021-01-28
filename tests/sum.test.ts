function sum(a: number, b: number) {
  return a + b;
}

test("add 1 + 2", () => {
  const str: string = "42";
  expect(sum(1, 2)).toEqual(3);
});
