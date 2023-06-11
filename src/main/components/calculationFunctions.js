const forStop = (t1, t2, t3, carVelocity, J) => {
    return (+t1 + +t2 + (0.5 * +t3)) * (carVelocity / 3.6) + ((carVelocity * carVelocity) / (26 * J));
}

const lengthBeforeBarrier = (carVelocity, humanVelocity, humanLength) => {
    return (carVelocity / humanVelocity) * humanLength;
}

export const driverNeed = (form) => {
    const {t1, t2, t3, carVelocity, humanVelocity, humanLength, J} = form;
    return forStop(t1, t2, t3, carVelocity, J);
}

export const driverHas = (form) => {
    const {t1, t2, t3, carVelocity, humanVelocity, humanLength, J} = form;
    return lengthBeforeBarrier(carVelocity, humanVelocity, humanLength);
}


export const isDriverGuilty = (form) => {
    const {t1, t2, t3, carVelocity, humanVelocity, humanLength, J} = form;
    const need = forStop(t1, t2, t3, carVelocity, J);
    const has = lengthBeforeBarrier(carVelocity, humanVelocity, humanLength);
    console.log(`Driver needs: ${need}\n\n Driver has ${has}`);
    return need < has;
}