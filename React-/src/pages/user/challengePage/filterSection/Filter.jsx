import React, { useState } from 'react';
import './filter.css';


function Filter() {

    const [active, setactive] = useState(false);

    return ( 
        <>
            <div className="filter-Section">

                <div className="filter-header filterParts">
                    <h1>Filter</h1>
                </div>

                <div className="filter-search filterParts">

                    <div className="filter-subheader">
                        <h2>Search</h2>
                    </div>

                    <input type="text" placeholder='Search by name'/>
                </div>

                <div className="filter-list filterParts">

                    <div className="filter-subheader">
                        <h2>Category</h2>
                    </div>

                    <div className="filter-list-items">
                        <ul>
                            <a href="0"><li>All</li></a>
                            <a href="1"><li>cat 1</li></a>
                            <a href="2"><li>cat 2</li></a>
                            <a href="3"><li>cat 3</li></a>
                            
                        </ul>
                    </div>

                </div>

                <div className="filter-list filterParts">

                    <div className="filter-subheader">
                        <h2>Difficulty</h2>
                    </div>

                    <div className="filter-list-items">
                        <ul>
                            <a href="0"><li>All</li></a>
                            <a href="1"><li>Easy</li></a>
                            <a href="2"><li>Medium</li></a>
                            <a href="3"><li>Hard</li></a>
                        </ul>
                    </div>

                </div>


            </div>
        </>
     );
}

export default Filter;