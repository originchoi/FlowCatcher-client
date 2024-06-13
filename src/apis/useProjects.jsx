import { useState, useCallback } from "react";
import axios from "axios";

function useProjects(userId) {
  const [projects, setProjects] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchProjects = useCallback(async () => {
    setisLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/users/${userId}/projects`,
        { withCredentials: true },
      );

      setProjects(response.data);
      setErrorMessage(null);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setisLoading(false);
    }
  }, [userId]);

  const addProject = useCallback(
    async (projectName) => {
      setisLoading(true);

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
        setErrorMessage(err.message);
        return null;
      } finally {
        setisLoading(false);
      }
    },
    [userId],
  );

  const deleteProject = useCallback(
    async (projectId) => {
      setisLoading(true);

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
        setErrorMessage(err.message);
      } finally {
        setisLoading(false);
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
