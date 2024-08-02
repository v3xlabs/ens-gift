export const gasPriceMagic = (
    gas: bigint,
    gasPrice: bigint,
    ethUSDC: number
) => {
    return (
        Number(
            BigInt(Math.round(Number((gas * gasPrice) / 10_000n) * ethUSDC)) /
                1_000_000n
        ) / 1_000_000_000
    ).toPrecision(3);
};
