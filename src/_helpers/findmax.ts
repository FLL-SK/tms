import getPath from 'lodash/get';

export const findMaxIndex = (array: Object[], path: string): number => {
    if (!array || array.length == 0) return -1;

    let m = array[0][path];
    let idx = -1;

    for (let i = 0; i < array.length; i++) {
        let v = getPath(array[i], path);
        if (v > m) {
            m = v;
            idx = i;
        }
    }
    return idx;
};
