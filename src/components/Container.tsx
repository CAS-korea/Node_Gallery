import React, { ReactNode } from 'react';

interface PostContainerProps {
    children?: ReactNode;
}

const PostContainer: React.FC<PostContainerProps> = ({ children }) => {
    return (
        <div className="w-full bg-white text-black p-6 space-y-6 rounded-xl shadow-lg">
            {children}
        </div>
    );
};

export default PostContainer;
