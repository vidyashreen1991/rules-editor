//This method avoids calling the function many times
export const debounce = (time, callBack) => {
    let timer;
    return (params) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            callBack(params);
            clearTimeout(timer);
            timer = null;
        }, time);
    }
}