export const getInThreeDays = () => {
    let tomorrow = new Date();
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 3);
    return tomorrow
}
