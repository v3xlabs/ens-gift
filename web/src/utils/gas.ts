export const gasToEth = (gas: bigint, gasPrice: bigint) => {
    console.log(
        gas,
        gasPrice,
        gas * gasPrice,
        Number(gas * gasPrice) / 1_000_000_000_000_000_000
    );

    return Number(gas * gasPrice) / 1_000_000_000_000_000_000;
};
