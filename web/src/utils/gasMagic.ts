export const gasPriceMagic = (
    gas: bigint,
    gasPrice: bigint,
    ethUSDC: bigint
) => {
    return (
        Number(
            BigInt(
                Math.round(
                    Number(BigInt((gas * gasPrice) / 10_000n) * BigInt(ethUSDC))
                )
            ) / 1_000_000n
        ) / 1_000_000_000_000
    ).toPrecision(3);
};
