import { useState } from "react";
import { alumniData } from "../types/alumniData";

export default function AlumniSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="mt-10 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Наши Выпускники</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alumniData.map((alumnus, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 cursor-pointer border border-gray-200 hover:shadow-xl"
            onClick={() => toggleExpand(index)}
          >
            <img src={alumnus.imgURL} alt={alumnus.name} className="w-full object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-blue-600">{alumnus.name}</h3>
              <p className="text-gray-700 text-sm">{alumnus.title}</p>
              <div
                className={`transition-all duration-300 mt-2 text-gray-600 text-sm ${
                  expandedIndex === index ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <p className="mt-2 whitespace-pre-line">{alumnus.desc}</p>
              </div>
              <p className="text-sm text-blue-500 mt-2">
                {expandedIndex === index ? "Скрыть" : "Подробнее..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
