import React from 'react';
import PostContainer from "../../components/Container";
import { Search as SearchIcon } from 'lucide-react'; // 아이콘 이름 변경

const SearchPage: React.FC = () => {
    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold">검색</h1>
            <p className="text-lg">원하는 내용을 검색하세요!</p>
            {/* 아이콘과 input을 감싸는 wrapper */}
            <div className="relative">
                {/* 아이콘: input의 좌측에 위치시키기 위해 absolute 사용 */}
                <SearchIcon
                    size={22}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <input
                    type="search"
                    placeholder="검색어를 입력하세요" // 문자열 사용
                    className="w-full pl-10 px-4 py-2 shadow-lg bg-gray-100 rounded-md text-black border border-gray-200 focus:outline-none"
                />
            </div>
        </PostContainer>
    );
};

export default SearchPage;
