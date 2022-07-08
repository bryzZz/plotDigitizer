import { getDominantColors } from '../utils';

onmessage = (e: MessageEvent<Uint8ClampedArray>) => {
    postMessage(getDominantColors(e.data));
};
