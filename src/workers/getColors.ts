import { getColors, buildRgb, quantization } from '../utils';

onmessage = function (e) {
    const result = quantization(buildRgb(e.data), 0);
    console.log(result);

    // const result = getColors(e.data);
    // const normResult = result
    //     .map(([k]) => {
    //         const [r, g, b] = k.split(',');

    //         return `rgb(${r},${g},${b})`;
    //     })
    //     .splice(0, 5);
    postMessage([]);
};
