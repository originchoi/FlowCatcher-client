export interface Project {
  _id: string;
  projectName: string;
  apiKey: string;
  createdAt: string;
}

export interface UseProjectsResult {
  projects: Project[];
  isLoading: boolean;
  errorMessage: string | null;
  fetchProjects: () => Promise<void>;
  addProject: (
    projectName: string,
  ) => Promise<{ project: Project; scriptCode: string } | null>;
  deleteProject: (projectId: string) => Promise<void>;
}
