import INbuRate from "../model/INbuRate";

const API_BASE = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

function formatNbuDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
}

export default class NbuRateApi {
    static getRates(date?: Date): Promise<Array<INbuRate>> {
        const url = date ? `${API_BASE}&date=${formatNbuDate(date)}` : API_BASE;

        return new Promise((resolve, reject) => {
            fetch(url)
                .then(r => r.json())
                .then(resolve)
                .catch(reject);
        });
    }

    static getCurrentRates(): Promise<Array<INbuRate>> {
        return this.getRates();
    }
};