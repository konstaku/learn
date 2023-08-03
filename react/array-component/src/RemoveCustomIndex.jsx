export function RemoveCustomIndex(props) {
  const result = [];

  for (let i = 0; i < props.array.length; i++) {
    result.push(
      <input type="button" value={'remove ' + i} key={i} data-index={i} />
    );
  }

  return result;
}
