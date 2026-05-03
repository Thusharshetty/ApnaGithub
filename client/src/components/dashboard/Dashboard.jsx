import { useState, useEffect } from "react";
import './dashboard.css'


export default function Dashboard(){
    const [repositories, setRepositories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedRepositories, setSuggestedRepositories] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=>{
        const userId=localStorage.getItem("userId");
        const fetchRepositories=async()=>{
            try{
                const res=await fetch(`http://localhost:3000/repo/user/${userId}`);
                const data=await res.json();
                setRepositories(data.repositories);
            } catch (error) {
                console.error("Error fetching repositories:", error);
            }
        }

        const fetchSuggestedRepositories=async()=>{
            try{
                const res=await fetch(`http://localhost:3000/repo/all`);
                const data=await res.json();
                setSuggestedRepositories(data);
                console.log("Suggested Repositories:", suggestedRepositories);
            } catch (error) {
                console.error("Error fetching suggested repositories:", error);
            }
        }
        fetchRepositories();
        fetchSuggestedRepositories();
    }, []);

    useEffect(()=>{
        if(searchQuery === ""){
            setSearchResults(repositories);
        }
        const results=repositories.filter(repo=>
            repo.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    },[searchQuery,repositories]);

    return(
        <>
       <section id="dashboard">
        <aside>
            <h3>Suggested repositories</h3>
           
                {suggestedRepositories.map(repo=>(
                    <div key={repo._id}>
                        <h2>{repo.name}</h2>
                        <p>{repo.description}</p>
                    </div>
                ))}
       
        </aside>
        <main>
            <h2>
                My Repositories
            </h2>
           <div id="search">
            <input 
                type="text"
                placeholder="Search repositories..."
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}/>
                </div>
                {repositories.map(repo=>(
                    <div key={repo._id}>
                        <h2>{repo.name}</h2>
                        <p>{repo.description}</p>
                    </div>
                ))}
          
        </main>
        <aside className="rightaside">
  <h3>Upcoming Events</h3>
  <ul>
    <li>
      <p>Tech Conference - Dec 15</p>
    </li>
    <li>
      <p>Developer Meetup - Dec 25</p>
    </li>
    <li>
      <p>React Summit -Jan 5</p>
    </li>
  </ul>
</aside>

       </section>
        </>
    )
}