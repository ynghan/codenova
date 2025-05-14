import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import sql from 'highlight.js/lib/languages/sql';
import 'highlight.js/styles/atom-one-dark.css';
import { useState, useEffect, useMemo } from 'react';


// 등록
hljs.registerLanguage('java', java);
hljs.registerLanguage('python', python);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('sql', sql);


const CodeDescription = ({onClose}) => {

    const lang = "JS";

    const langFormat = useMemo(() => {
        if (lang === "JAVA") return "language-java";
        if (lang === "PYTHON") return "language-python";
        if (lang === "JS") return "language-javascript";
        if (lang === "SQL") return "language-sql";
        return "";
    }, [lang]);

    useEffect(() => {
        hljs.highlightAll();
    }, [langFormat]);

    const sampleCode = `
function greet(name) {
    console.log("Hello, " + name);

greet("World");
`;
    
    return (
        <div className="w-[90%] h-[90%] z-[9999] rounded-xl flex items-center justify-center border-2"
            style={{
                backgroundColor: '#111111',
                borderColor : "rgba(255, 255, 255, 0.1)"
            }}
        >
            <div className='absolute w-[5%] h-[5%] right-0 top-2 text-7xl text-gray-400 cursor-pointer transition-all duration-150 hover:brightness-110 hover:translate-y-[2px] hover:scale-[0.98] active:scale-[0.95]'
                onClick={onClose}
            >
                x
            </div>

            <div className="w-[99%] h-[98%] rounded-xl flex p-2 items-center justify-between"
            >
                <div className="w-[50%] h-full border-2 rounded-xl"
                    style={{
                        borderColor : "rgba(255, 255, 255, 0.1)",
                        backgroundColor: '#282c34'
                    }}
                >   

                    {/* 코드 */}
                    <pre className='h-full w-full px-8'>
                        <code className={` ${langFormat}`}>
                            {sampleCode}
                        </code>
                    </pre>

                </div>

                <div className="w-[50%] h-full border-2 rounded-xl text-white p-4 "
                    style={{
                        borderColor : "rgba(255, 255, 255, 0.1)",
                        backgroundColor: '#1C1C1C'
                    }}
                >
                    {/* 코드 설명 */}
                    <div className='w-full h-full'>
                        <h3 className="text-lg font-bold mb-2">📌 코드 설명</h3>
                        <p><strong>greet 함수</strong>는 전달받은 name을 이용해 콘솔에 인사 메시지를 출력합니다.</p>
                        <p>마지막 줄에서 greet("World") 를 호출하면 <code>Hello, World</code> 가 출력됩니다.</p>
                    </div>
                

                </div>
            </div>
        </div>
    )
}

export default CodeDescription;