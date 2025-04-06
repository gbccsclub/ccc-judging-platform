import React, { useEffect, useState } from 'react';

interface ColorBlob {
    color: string;
    x: number;
    y: number;
    size: number;
    opacity: number;
}

export interface CircleProps {
    radius?: number;
}

export default function DiffusedGradientCircle({
    radius = 128 
}) {
    const [colorBlobs, setColorBlobs] = useState<ColorBlob[]>([]);

    const getRandomColor = (): string => {
        const h = Math.floor(150 + Math.random() * 90);
        const s = Math.floor(100); 
        const l = Math.floor(45); 
        return `hsl(${h}, ${s}%, ${l}%)`;
    };

    const getRandomPosition = (edgeBias = false): { x: number; y: number } => {
        const angle = Math.random() * Math.PI * 2;

        let distance;
        if (edgeBias) {
            distance = 15 + Math.random() * 60;
        } else {
            distance = Math.random() * 70;
        }

        return {
            x: 50 + Math.cos(angle) * distance,
            y: 50 + Math.sin(angle) * distance
        };
    };

    useEffect(() => {
        const scaleFactor = Math.max(0.5, Math.min(1.5, radius / 128));
        const blobCount = Math.max(5, Math.floor(8 * scaleFactor));
        const newBlobs: ColorBlob[] = [];

        for (let i = 0; i < Math.floor(blobCount / 2); i++) {
            const position = getRandomPosition(false);
            newBlobs.push({
                color: getRandomColor(),
                x: position.x,
                y: position.y,
                size: 50 + Math.random() * 40, 
                opacity: 0.7 + Math.random() * 0.3 
            });
        }

        for (let i = 0; i < Math.ceil(blobCount / 2); i++) {
            const position = getRandomPosition(true);
            newBlobs.push({
                color: getRandomColor(),
                x: position.x,
                y: position.y,
                size: 20 + Math.random() * 30, 
                opacity: 0.6 + Math.random() * 0.4 
            });
        }

        setColorBlobs(newBlobs);
    }, [radius]); 

    const getBlurAmount = (): string => {
        if (radius <= 32) return '8px';
        if (radius <= 64) return '15px';
        if (radius <= 96) return '25px';
        return '35px';
    };

    const circleBgStyle: React.CSSProperties = {
        position: 'relative',
        overflow: 'hidden',
        filter: `blur(${getBlurAmount()})`,
        width: '100%',
        height: '100%'
    };

    const circleStyle: React.CSSProperties = {
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: 'rgb(255, 255, 255)'
    };

    return (
        <div style={circleStyle}>
            <div style={circleBgStyle}
                className='group-hover:bg-emerald-500 transition duration-200 ease-in-out'
            >
                {colorBlobs.map((blob, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            backgroundColor: blob.color,
                            width: `${blob.size}%`,
                            height: `${blob.size}%`,
                            borderRadius: '50%',
                            left: `${blob.x}%`,
                            top: `${blob.y}%`,
                            transform: 'translate(-50%, -50%)',
                            opacity: blob.opacity
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
