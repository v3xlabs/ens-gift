import useSWR from 'swr';

export const useEthUsd = (timestamp?: number) => {
    const date = timestamp ? new Date(timestamp) : new Date(Date.now());
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();

    // dd-mm-yyyy
    const dateString = `${day}-${month}-${year}`;

    return useSWR(['ethUsd', dateString], async () => {
        const x = localStorage.getItem('usdc-eth-' + dateString);

        if (x) return Number(x);

        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/ethereum/history?date=${dateString}`
        );

        const data = await response.json();

        // USDC per 1000 ETH
        const value = Number(data.market_data.current_price.usd) * 1000;

        localStorage.setItem('usdc-eth-' + dateString, value.toString());

        return Number(value);
    });
};
