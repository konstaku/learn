import { Link, useLoaderData } from 'react-router-dom';

export function TeamNav() {
  const teamMembers = useLoaderData();

  return (
    <ul className="nav">
      {teamMembers.map((member) => (
        <li key={member.id}>
          <Link to={`${member.id}`}>{member.name}</Link>
        </li>
      ))}
    </ul>
  );
}
