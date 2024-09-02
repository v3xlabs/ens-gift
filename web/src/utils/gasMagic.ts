export const gasPriceMagic = (
    gas: bigint,
    gasPrice: bigint,
    ethUSDC: bigint
) => {
    return (
        Number((BigInt(gas * gasPrice) * BigInt(ethUSDC)) / 1_000_000n) / 1e18
    ).toPrecision(3);
};
