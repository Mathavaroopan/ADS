import React, { useState, useEffect } from "react";
import axios from "axios";

function Body({ filters }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/projects");
        console.log(response.data); // Log the response data
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
  
    fetchProjects();
  }, []);
  
  // Filter projects based on the provided filters
  const filteredProjects = projects.filter(project => {
    // Check if the project matches the selected year
    const year = parseInt(filters.year.slice(-1))
    if(project.year !== year && filters.year !== 'All') return false;

    // Check if the project matches the selected domain
    if (filters.domain && filters.domain !== "All" && filters.domain !== project.category) {
      return false;
    }

    // Check if the project started within the specified number of years
    if (filters.years !== 'All') {
      const currentYear = new Date().getFullYear();
      const projectStartYear = new Date(project.Start_date).getFullYear();
      const yearsDifference = currentYear - projectStartYear;
      if (yearsDifference > parseInt(filters.years)) {
        return false;
      }
    }

    return true;
  });

  return (
    <>
      <h2>Projects</h2>
      <ul>
        {filteredProjects.map((project, index) => (
          <li key={index}>
            <p>{project.project_name}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Body;
