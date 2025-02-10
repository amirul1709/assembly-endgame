export default function Chip(props) {
  return (
    <button
      style={{ color: props.color, backgroundColor: props.backgroundColor }}
    >
      {props.lang}
    </button>
  );
}
