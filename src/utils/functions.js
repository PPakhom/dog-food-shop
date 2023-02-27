// export const PATH = "/";
export const PATH = "/dog-food-shop/";

export const priceDiscount = (price, discount) =>  price - price * discount / 100;

export const numArrayToWord = (num, array) => {
    return `${num} ${array[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]]}`;
}

export const addDaysToDate = (date, incDay) => { 
    date.setDate(date.getDate() + incDay);
    return new Date(date).toLocaleString('ru-RU', { month: 'long', day: 'numeric' });
 }

export const dayMonthYearToString = (date) => {
    return new Date(date).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' });
 }

export const ratingTotal = (reviews) => {
    let rating = 0;
    for (let i = 0; i < reviews.length; i++) {
        rating += reviews[i].rating
    }
    return (rating / (reviews.length)).toFixed(1);
}