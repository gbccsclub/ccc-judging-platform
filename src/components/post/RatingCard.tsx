import { Button } from "flowbite-react";

export interface RatingCardProps {
    totalVotes: number;
    totalAesthetic: number;
    totalOriginality: number;
    aesthetic: number;
    originality: number;
    setAesthetic: (value: number) => void;
    setOriginality: (value: number) => void;
    onSubmit: () => void;
}

export default function RatingCard({
    totalVotes,
    totalAesthetic,
    totalOriginality,
    aesthetic,
    originality,
    setAesthetic,
    setOriginality,
    onSubmit,
}: RatingCardProps) {
    const getAestheticLabel = (value: number) => {
        switch (value) {
            case 0: return "Poor";
            case 1: return "Basic";
            case 2: return "Good";
            case 3: return "Appealing";
            case 4: return "Beautiful";
            default: return "Not rated";
        }
    };

    const getOriginalityLabel = (value: number) => {
        switch (value) {
            case 0: return "Common";
            case 1: return "Familiar";
            case 2: return "Interesting";
            case 3: return "Unique";
            case 4: return "Innovative";
            default: return "Not rated";
        }
    };

    return <div className='mt-4 p-4 bg-white rounded-lg border-gray-300 border'>
        <div className="flex justify-between items-center mb-4" >
            <h3 className="text-xl font-serif text-gray-700">
                Rating: <span
                className="text-orange-500 text-sm font-sans ml-2">Aesthetic: {totalAesthetic || "N/A"}</span> <span
                className="text-blue-500 ml-2 text-sm font-sans">Originality: {totalOriginality || "N/A"}</span>
            </h3>

            <p className={"text-sm font-medium text-gray-400"}>
                {totalVotes || "0"} Vote{totalVotes <= 1 ? "" : "s"}
            </p>
        </div>

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
                max={4}
                step={1}
                value={aesthetic}
                onChange={(e) => setAesthetic(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Beautiful</span>
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
                max={4}
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

        <Button
            color="primary"
            size="xs"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={onSubmit}
        >
            Rate
        </Button>
    </div>
}







