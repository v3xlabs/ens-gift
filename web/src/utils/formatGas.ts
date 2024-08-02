// Divide by 10e8 to get gwei but keep 2 decimals of precision so 1.23 return as string
export const formatGas = (gas: BigInt): string => {
    return (Number(BigInt(gas.toString()) / BigInt(10e6)) / 10).toString();
};
