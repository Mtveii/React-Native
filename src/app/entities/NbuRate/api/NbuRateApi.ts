import INbuRate from "../model/INbuRate";

export default class NbuRateApi {
    static getCurrentRates():Promise<Array<INbuRate>> {
        return new Promise((resolve, reject) => {
            fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
            .then(r => r.json())
            .then(resolve)
            .catch(reject);
        });
    }

    static getRatesByDate(date: string): Promise<Array<INbuRate>> {
        return new Promise((resolve, reject) => {
            fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${date}&json`)
            .then(r => r.json())
            .then(resolve)
            .catch(reject);
        });
    }
};