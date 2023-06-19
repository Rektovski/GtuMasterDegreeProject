export const dateNow = () => {
    const currentTime = new Date();

    const day = currentTime.getDate();
    const month = currentTime.getMonth() + 1; // Months are zero-based, so we add 1
    const year = currentTime.getFullYear();

    const formattedDate = `${day < 10 ? "0" + day : day}/${month < 10 ? "0" + month : month}/${year}`;

    let hours = currentTime.getHours().toString();
    let minutes = currentTime.getMinutes().toString();
    let seconds = currentTime.getSeconds().toString();

    if(hours < 10) {
        hours = `0${hours}`;
    }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    if(seconds < 10) {
        seconds = `0${seconds}`;
    }

    return formattedDate + ": " + hours + ' : ' + minutes + ' : ' + seconds;
}