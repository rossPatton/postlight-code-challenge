type Props = { count: number, offset: number, items: ts.Directory };

export const getSliceOfArray = ({ count, offset, items }: Props): ts.Directory => {
  const newArray = [...items];
  const end = offset * count;
  const start = end - count;
  return newArray.slice(start, end);
}
