import React from 'react';
import PostContainer from  "../../components/Container";

const DetailDm: React.FC = () => {
    return (
        <PostContainer>
            <h1 className="text-3xl font-semibold">채팅 상세</h1>
            <div className="bg-white  p-6 rounded-md space-y-4">
                <p>홍길동: 안녕하세요!</p>
                <p>김철수: 반갑습니다!</p>
                <textarea
                    placeholder="메시지를 입력하세요..."
                    className="w-full px-4 py-2 bg-white  rounded-md text-black border border-gray-200 focus:outline-none"
                    rows={3}
                />
                <button className="w-full py-3 bg-gray-200 text-black rounded-full hover:bg-gray-100 transition-colors">
                    보내기
                </button>
            </div>
        </PostContainer>
    );
};

export default DetailDm;
