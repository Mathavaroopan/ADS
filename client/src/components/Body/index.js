import React, { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
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
    function romanToNumber(roman) {
      const romanNumerals = {
        I: 1,
        II: 2,
        III: 3,
        IV: 4,
      };
      return romanNumerals[roman] || null;
    }
  
  // Filter projects based on the provided filters
  const filteredProjects = projects.filter(project => {
    // Check if the project matches the selected year
    const year = project.Start_date ? new Date(project.Start_date).getFullYear().toString() : "All"; // Convert Start_date to Date object
    const selectedYear = filters.year !== "All" ? romanToNumber(filters.year) : null;
    if (selectedYear && selectedYear !== "All" && selectedYear !== year) {
      return false;
    }

    // Check if the project matches the selected domain
    if (filters.domain && filters.domain !== "All" && filters.domain !== project.category) {
      return false;
    }

    // Check if the project matches the selected number of years
    if (filters.years && filters.years !== "All" && filters.years !== project.duration.toString()) {
      return false;
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
