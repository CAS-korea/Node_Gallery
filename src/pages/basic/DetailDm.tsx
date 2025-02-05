import React from 'react';

const DetailDm: React.FC = () => {
    return (
        <div className="w-full bg-gray-900 text-white p-6 space-y-6">
            <h1 className="text-3xl font-semibold">채팅 상세</h1>
            <div className="bg-gray-800 p-6 rounded-md space-y-4">
                <p>홍길동: 안녕하세요!</p>
                <p>김철수: 반갑습니다!</p>
                <textarea
                    placeholder="메시지를 입력하세요..."
                    className="w-full px-4 py-2 bg-gray-800 rounded-md text-white border border-gray-600 focus:outline-none"
                    rows={3}
                />
                <button className="w-full py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
                    보내기
                </button>
            </div>
        </div>
    );
};

export default DetailDm;
