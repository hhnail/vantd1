/**
 * 空
 */
export const isEmpty = (str) => {
    return !str || str.trim() == "";
}

/**
 * 非空
 */
export const notEmpty = (str) => {
    return str && "" != str.trim();
}