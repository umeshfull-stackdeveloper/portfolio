const json = await res.json();

if (json.success && json.data && json.data.length > 0) {
  const normalized = json.data.map(project => ({
    _id: project._id,
    title: project.title,
    description: project.description,
    image: project.image,

    // FIX HERE (backend mismatch)
    technologies: project.technologies?.length
      ? project.technologies
      : project.techStack || [],

    githubLink: project.githubLink || project.github || '',
    liveLink: project.liveLink || project.live || '',
    featured: project.featured || false
  }));

  setProjects(normalized);
  setUsingMock(false);
} else {
  setProjects(FALLBACK_PROJECTS);
  setUsingMock(true);
}