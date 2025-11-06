import React from 'react';

export default function SortBy({ optionArray, setSortBy, sortBy }) {
    return (
        <div className="inline-block p-2">
            <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-[#363636] block w-auto px-2 py-2 text-sm max-md:w-38 max-lg:mt-11 max-lg:h-11 rounded-md font-bold bg-[#ededed] max-lg:bg-white"
            >
                {optionArray?.map((e) => (
                    <option key={e.value} className="py-2 px-3" value={e.value}>{e.label}</option>
                ))}
            </select>
        </div>
    );
}