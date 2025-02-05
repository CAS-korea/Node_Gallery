import React from 'react';

const Search: React.FC = () => {
    return (
        <div className="w-full bg-gray-900 text-white p-6 space-y-6">
            <h1 className="text-3xl font-semibold">검색</h1>
            <p className="text-lg">원하는 내용을 검색하세요!</p>
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full px-4 py-2 bg-gray-800 rounded-md text-white border border-gray-600 focus:outline-none"
            />
        </div>
    );
};

export default Search;