export default function ProjectList({ technologies, ...props }) {
  return (
    <ul {...props}>
      {technologies?.map((techno, index) => (
        <li key={index} className="mb-1">
          {techno}
        </li>
      ))}
    </ul>
  );
}
