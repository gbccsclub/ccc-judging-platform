import { useState } from "react";

export default function RatingCard() {
    const [aesthetic, setAesthetic] = useState(0);
    const [originality, setOriginality] = useState(0);
    
    const getAestheticLabel = (value: number) => {
        switch(value) {
            case 0: return "Poor";
            case 1: return "Basic";
            case 2: return "Good";
            case 3: return "Appealing";
            case 4: return "Beautiful";
            case 5: return "Excellent";
            default: return "Not rated";
        }
    };
    
    const getOriginalityLabel = (value: number) => {
        switch(value) {
            case 0: return "Common";
            case 1: return "Familiar";
            case 2: return "Interesting";
            case 3: return "Unique";
            case 4: return "Novel";
            case 5: return "Innovative";
            default: return "Not rated";
        }
    };

    return <div className='mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100'>
        <h3 className="text-xl font-serif text-gray-700 mb-4">
            Rating
        </h3>

        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                    Aesthetic
                </label>
                <span className="text-blue-600 font-bold">{getAestheticLabel(aesthetic)}</span>
            </div>
            <input 
                type="range" 
                min={0} 
                max={5} 
                step={1}
                value={aesthetic} 
                onChange={(e) => setAesthetic(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" 
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Excellent</span>
            </div>
        </div>

        <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-700">
                    Originality
                </label>
                <span className="text-blue-600 font-bold">{getOriginalityLabel(originality)}</span>
            </div>
            <input 
                type="range" 
                min={0} 
                max={5} 
                step={1}
                value={originality} 
                onChange={(e) => setOriginality(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500" 
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Common</span>
                <span>Innovative</span>
            </div>
        </div>
    </div>
}