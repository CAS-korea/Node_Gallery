// MovingBlurBackground.tsx
import './Index.css';
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";

const Index: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen overflow-y-auto flex flex-col px-16">
            <Header/>

            {/* 배경 컨테이너*/}
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="relative w-[500px] h-[500px]">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                </div>
            </div>

            {/* 텍스트 컨테이너 */}
            <div className="relative z-10 flex flex-col items-center space-y-[30vh] px-8">
                <section className="h-screen flex flex-col justify-center text-center">
                    <h1 className="text-black text-3xl font-serif text-shadow tracking-wide leading-relaxed">
                        Show Your Best.
                    </h1>
                    <h1 className="text-black text-7xl font-serif text-shadow tracking-wide leading-none">
                        NODE
                    </h1>
                </section>

                <section className="h-screen flex flex-col justify-center text-center">
                    <h1 className="text-black text-3xl font-normal text-shadow tracking-wide leading-relaxed">
                        해봐야 안다.
                    </h1>
                    <h1 className="text-black text-7xl font-serif text-shadow tracking-wide leading-none">
                        CAS
                    </h1>
                </section>
                <Footer/>
            </div>
        </div>
    );
};

export default Index;