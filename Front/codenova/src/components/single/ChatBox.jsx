import { useState , useRef, useEffect } from "react";
const ChatBox = () => {

    const [currentInput, setCurrentInput] = useState("")
    const inputAreaRef = useRef(null);
    const [content, setContent] =useState([])

    useEffect(() => {            
        inputAreaRef.current.focus();
        
    }, []);

    const handleSubmit = () => {
        console.log('Submit:', currentInput );
        const newMessage = {
            sender : "me",
            time : new Date().toLocaleString(),
            message : currentInput
        }
        setContent((prev) => [...prev, newMessage])
        setCurrentInput("")
    };

    return (
        <div className="w-full h-[90%] border-black flex flex-col">

            {/* 체팅 박스 */}
            <div className="w-full h-[90%] pointer-events-none">
                {/* content를 AI가 보낸 답변이면 왼쪽 내가 친 대화내용이면 오른 쪽에 나오도록해야함함 */}
            </div>

            {/* 텍스트 인풋 박스 */}
            <div className="w-full h-[10%] flex items-center justify-center">
                <input type="text"
                    ref={inputAreaRef}
                    className="border-2 w-full h-[90%] rounded-xl relative px-2"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit()
                        }
                    }}
                />
            
                <button
                onClick = {() => {
                    handleSubmit()
                }}
                className = "absolute z-[11] right-6 bottom-0.5 -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 active:scale-95"
                >   
                    전송
                </button>
            </div>
            

        </div>

    )

}

export default ChatBox;