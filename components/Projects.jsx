import ProjectHome from "./ProjectHome";

export default function Projects({ projects }) {
  const works = Object.values(projects);
  return (
    works.length > 0 &&
    works.map((project, index) => (
      <ProjectHome key={index} project={project} index={index} />
    ))
  );
}
