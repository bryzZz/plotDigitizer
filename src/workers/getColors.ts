import { getColors } from '../utils';

onmessage = function (e) {
    const result = getColors(e.data);
    const normResult = result
        .map(([k]) => {
            const [r, g, b] = k.split(',');

            return `rgb(${r},${g},${b})`;
        })
        .splice(0, 5);
    postMessage(normResult);
};
