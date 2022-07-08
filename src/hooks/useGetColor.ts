import { useEffect, useRef, useState } from 'react';
import { DominantColor } from '../types';

export const useGetColor = () => {
    const [result, setResult] = useState<DominantColor[]>([]);
    const workerRef = useRef<Worker>();

    useEffect(() => {
        const worker = new Worker(
            new URL('../workers/getColors.ts', import.meta.url),
            {
                type: 'module',
            }
        );
        workerRef.current = worker;
        worker.onmessage = (event: MessageEvent<DominantColor[]>) => {
            setResult(event.data);
        };

        return () => {
            worker.terminate();
        };
    }, []);

    return {
        result,
        run: (data: Uint8ClampedArray) => workerRef.current!.postMessage(data),
    };
};
