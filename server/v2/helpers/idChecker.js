export default id => {
    const integer = Number(id);
    return Number.isInteger(integer) &&
        integer > 0 &&
        integer.toString().length <= 8 ?
        integer :
        false;
};
