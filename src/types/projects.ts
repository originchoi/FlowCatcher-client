export interface Project {
  _id: string;
  projectName: string;
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

export interface ProjectActionsProps {
  addProject: UseProjectsResult["addProject"];
  deleteProject: UseProjectsResult["deleteProject"];
  fetchProjects: UseProjectsResult["fetchProjects"];
}
