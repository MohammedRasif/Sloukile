import { Bot } from "lucide-react";

const AiChatBot = () => {
    return (
        <div className="border-t border-gray-300 px-10 p-5 bg-white  h-full overflow-hidden">
            <div className="flex items-center space-x-2">
                <Bot className="w-10 h-10 text-[#dbb929]" />
                <h1 className="text-3xl font-[500]">AI Chat</h1>
            </div>
            {/* <hr className="mt-5 border-t-2 border-gray-300" /> */}
        </div>


    );
}

export default AiChatBot;
