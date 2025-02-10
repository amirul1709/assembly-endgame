export default function Chip(props) {
  return (
    <span
      style={{ color: props.color, backgroundColor: props.backgroundColor }}
    >
      {props.lang}
    </span>
  );
}
