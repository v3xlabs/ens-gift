import useSWR from 'swr';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
});

export const useEthUsd = (timestamp?: number) => {
    // const date = timestamp ? new Date(timestamp) : new Date(Date.now());
    // const year = date.getUTCFullYear();
    // const month = date.getUTCMonth() + 1;
    // const day = date.getUTCDate();

    // // dd-mm-yyyy
    // const dateString = `${day}-${month}-${year}`;

    // https://node1.web3api.com/
    return useSWR(
        ['ethUsd'],
        async () => {
            const v = await publicClient.call({
                to: '0x986b5E1e1755e3C2440e960477f25201B0a8bbD4',
                data: '0x50d25bcd',
            });

            // return Number(value);
            if (!v || !v.data) throw new Error('Failed to fetch eth price');

            // 24 because 18 (eth) + 6 (usdc)
            const scale = BigInt(1e24);
            const value = BigInt(v.data.toString());

            return scale / value;
        },
        {
            dedupingInterval: 4000,
            focusThrottleInterval: 1000 * 60 * 60, // once every hour
        }
    );
};
