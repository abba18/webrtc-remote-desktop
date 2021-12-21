export const objToUri = (param) => {
    return '?' + Object.keys(param).map(key => `${key}=${param[key]}`).join('&')
}