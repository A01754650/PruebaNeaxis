let idGlobal = {
    userId: null,
};

export const setIdGlobal = (userId) => {
    idGlobal.userId = userId;
};

export const getIdGlobal = () => idGlobal.userId;
