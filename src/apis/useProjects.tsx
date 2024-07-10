import { useState, useCallback } from "react";
import axios from "axios";
import { Project, UseProjectsResult } from "src/types/projects";

function useProjects(userId: string): UseProjectsResult {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/${userId}/projects`,
        { withCredentials: true },
      );

      setProjects(response.data);
      setErrorMessage(null);
    } catch (err) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const addProject = useCallback(
    async (projectName: string) => {
      setIsLoading(true);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/users/${userId}/projects`,
          { projectName },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        setProjects((prevProjects) => [...prevProjects, response.data.project]);
        setErrorMessage(null);

        return response.data;
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [userId],
  );

  const deleteProject = useCallback(
    async (projectId: string) => {
      setIsLoading(true);

      try {
        await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/users/${userId}/projects/${projectId}`,
          { withCredentials: true },
        );

        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId),
        );
        setErrorMessage(null);
      } catch (err) {
        if (err instanceof Error) {
          setErrorMessage(err.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [userId],
  );

  return {
    projects,
    isLoading,
    errorMessage,
    fetchProjects,
    addProject,
    deleteProject,
  };
}

export default useProjects;
