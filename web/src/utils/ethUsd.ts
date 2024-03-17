import useSWR from 'swr';

export const useEthUsd = (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    // dd-mm-yyyy
    const dateString = `${day}-${month}-${year}`;

    return useSWR(['ethUsd', dateString], async () => {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/ethereum/history?date=${dateString}`
        );

        const data = await response.json();

        return data.market_data.current_price.usd as number;
    });
};
