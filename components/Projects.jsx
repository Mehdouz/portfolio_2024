import ProjectHome from "./ProjectHome";

export default function Projects({ projects }) {
  return (
    projects.length > 0 &&
    projects.map((project, index) => (
      <ProjectHome key={index} project={project} index={index} />
    ))
  );
}
