import { useState } from "react";
import { useAIChat } from "../hooks/ai/useAIChat";
import { sampleQuestions } from "../constants/sampleQuestions";
import { IoMdChatbubbles, IoMdClose } from "react-icons/io";
import MarkdownMessage from "./MarkdownMessage";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, loading } = useAIChat();

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  const handleSampleClick = async (text: string) => {
    await sendMessage(text);
    setIsOpen(true);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-red-700 text-white p-4 rounded-full shadow-lg hover:bg-red-800 transition z-50"
        >
          <IoMdChatbubbles size={24} />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-h-[85vh] bg-white/10 text-black backdrop-blur-sm shadow-2xl rounded-[30px] flex flex-col overflow-hidden z-50 border border-white/20">
          {/* Заголовок */}
          <div className="p-4 flex justify-between items-center border-b border-white/20 bg-white/90">
            <span className="text-lg font-semibold">Карьерный AI-чат</span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-red-300 transition"
            >
              <IoMdClose size={20} />
            </button>
          </div>

          {/* Сообщения */}
          <div className="flex-1 px-4 py-3 overflow-y-auto text-sm space-y-3">
            {messages.length === 0 ? (
              <div className="space-y-2">
                <p className="text-red-900">Попробуйте один из вопросов:</p>
                {sampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSampleClick(q)}
                    className="block w-full text-left bg-red-900/20 hover:bg-red-900/10 rounded px-3 py-2 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-md text-sm ${
                    msg.role === "user"
                      ? "max-w-fit bg-red-900/80 text-right self-end ml-auto text-white"
                      : "max-w-[85%] bg-white/80 self-start mr-auto"
                  }`}
                >
                  {msg.role === "user" ? msg.text : <MarkdownMessage content={msg.text} />}
                </div>
              ))
            )}

            {loading && <div className="text-red-900 italic">AI печатает...</div>}
          </div>

          {/* Поле ввода */}
          <div className="p-3 border-t border-white/20 flex gap-2 bg-white/90">
            <input
              type="text"
              placeholder="Введите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-red-900/10 text-black border border-red-900/70 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-white placeholder:text-red-950"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-red-800 hover:bg-red-900 text-white text-sm rounded transition disabled:opacity-50"
              disabled={loading}
            >
              Отправить
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;
