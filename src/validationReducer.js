const validationReducer = (state, item) => {
    // let newitem = {};
    // newitem[item.name] = item.valid;
    return { ...state, ...item };
};

export default validationReducer;
