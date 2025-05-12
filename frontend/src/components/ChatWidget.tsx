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
      {/* Иконка чата */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <IoMdChatbubbles size={24} />
        </button>
      )}

      {/* Окно чата */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 max-h-[80vh] bg-white shadow-xl rounded-lg flex flex-col overflow-hidden z-50">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span>Карьерный AI-чат</span>
            <button onClick={() => setIsOpen(false)}>
              <IoMdClose size={20} />
            </button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-gray-500">Попробуйте один из вопросов:</p>
                {sampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSampleClick(q)}
                    className="bg-gray-100 hover:bg-gray-200 rounded px-3 py-1 text-left w-full"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-md max-w-[85%] ${
                  msg.role === "user"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-100 self-start mr-auto"
                }`}
              >
                {msg.role === "user" ? msg.text : <MarkdownMessage content={msg.text} />}
              </div>
            ))}

            {loading && <div className="text-gray-400">AI печатает...</div>}
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Введите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 border rounded px-2 py-1 text-sm"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              className="btn btn-sm btn-primary"
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
