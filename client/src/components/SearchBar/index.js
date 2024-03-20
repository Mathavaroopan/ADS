import React, { useState, useEffect } from 'react';
import './index.css';
import Home from '../Home/index';
import axios from 'axios';

// New SearchBox component for suggestions
const SearchBox = ({ handleSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [projectNames, setProjectNames] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/projects");
                setProjectNames(response.data.map(project => ({ id: project._id, name: project.project_name })));
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    const handleSearchInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchQuery(inputValue);
        const filteredSuggestions = projectNames.filter(project =>
            project.name.toLowerCase().startsWith(inputValue.toLowerCase())
        );
        const maxSuggestionsToShow = 5;
        const limitedSuggestions = filteredSuggestions.slice(0, maxSuggestionsToShow);
        setSuggestions(limitedSuggestions);
    };

    const handleSuggestionClick = (project) => {
        setSearchQuery(project.name);
        setSuggestions([]);
        handleSearch(project); // Trigger search with selected suggestion
    };

    return (
        <div className='search-box'>
            <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchInputChange}
            />
            {suggestions.length > 0 && (
                <ul className="suggestions">
                    {suggestions.map((project, index) => (
                        <li key={index} onClick={() => handleSuggestionClick(project)}>
                            {project.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// Modified SearchBar component with integrated SearchBox
const SearchBar = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const [directionMarks, setDirectionMarks] = useState(0);
    const [resourceMarks, setResourceMarks] = useState(0);
    const [satisfactionMarks, setSatisfactionMarks] = useState(0);
    const [comments, setComments] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const handleSearch = (project) => {
        setSelectedProject(project);
        setSearchResult(null);
    };

    const handleInsertProgress = async () => {
        if (!selectedProject) {
            console.error("No project selected.");
            return;
        }

        const progressData = {
            projectId: selectedProject.id,
            direction: directionMarks,
            resource_utilization: resourceMarks,
            satisfaction: satisfactionMarks,
            comments: comments
        };
        console.log(progressData.directionMarks);
        try {
            console.log("insert start")
            try {
                const response = await axios.get("http://localhost:3000/api/projects");
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
            const response = await axios.post("http://localhost:3000/api/progress", progressData);
            console.log("insert end")
            console.log(response.data);
            // Reset form after successful insert
            setSelectedProject(null);
            setDirectionMarks(0);
            setResourceMarks(0);
            setSatisfactionMarks(0);
            setComments('');
            setSearchResult(response.data);
        } catch (error) {
            console.error("Error inserting progress:", error);
        }
    };

    return (
        <div className='progresspage'>
            <Home />
            <div className='secondbar'>
                <SearchBox handleSearch={handleSearch} />
            </div>
            {selectedProject && (
                <div className='table'>
                    <h3>Project Name: {selectedProject.name}</h3>
                    <h3>Project ID: {selectedProject.id}</h3>
                    <table>
                        <tbody>
                            <tr>
                                <td><h2><u>Direction</u></h2></td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={directionMarks} 
                                        min="0" 
                                        max="10" 
                                        onChange={(e) => setDirectionMarks(parseInt(e.target.value))}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><h2><u>Resource Utilization</u></h2></td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={resourceMarks} 
                                        min="0" 
                                        max="10" 
                                        onChange={(e) => setResourceMarks(parseInt(e.target.value))}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><h2><u>Satisfaction</u></h2></td>
                                <td>
                                    <input 
                                        type="number" 
                                        value={satisfactionMarks} 
                                        min="0" 
                                        max="10" 
                                        onChange={(e) => setSatisfactionMarks(parseInt(e.target.value))}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='comment'>
                        <h2>Comments</h2>
                        <input type="text" id="comments" placeholder='Enter your comments' value={comments} onChange={(e) => setComments(e.target.value)} />
                    </div>
                    <button onClick={handleInsertProgress}>Insert Progress</button>
                </div>
            )}
            {searchResult && (
                <div className='result'>
                    <h3>Progress inserted successfully for project: {searchResult.project_name}</h3>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
