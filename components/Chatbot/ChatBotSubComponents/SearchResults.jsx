import React from 'react';
import ProjectsList from './projects/ProjectsList';
import styles from '../index.module.css';


function SearchResults({
    searchQuery,
    projects,
    moreProperty,
    setMoreProperty,
    showMoreProperty = false,
}) {
    const propertyCount = projects?.length || 0;

    return (
        <div className="h-full flex flex-col overflow-hidden">
            {/* Fixed Header Section */}
            <div className="flex-shrink-0 p-2  border-gray-200 bg-white">
                <h1 className="text-2xl font-semibold text-primary mb-2">
                    Search result  <span className='text-2xl'>for {searchQuery}</span>
                </h1>
                <h3 className="text-primary font-medium">
                    {propertyCount} Properties Found
                </h3>
            </div>

            <div
                className={`max-h-[500px] flex-1 p-4 ${styles.hideScrollbar}`}
                style={{ maxWidth: showMoreProperty ? "700px" : "" }}
            >
                <ProjectsList
                    projects={projects}
                    moreProperty={moreProperty}
                    setMoreProperty={setMoreProperty}
                    showMoreProperty={showMoreProperty}
                />
            </div>


        </div>
    );
}

export default SearchResults;