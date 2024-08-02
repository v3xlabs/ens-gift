import { AllMultiReturnTypes } from './decodeTransaction';

export const aggregateTotals = (txs: AllMultiReturnTypes[]) => {
    const aggregates = txs.reduce(
        (aggregate, current) => {
            if (current.revert_reason != undefined) return aggregate;

            if (current?.method == 'renewAll') {
                aggregate.renewCount += BigInt(current.length);
                aggregate.renewTotal += BigInt(current.gas_used);
                aggregate.renewGasPriceCount += BigInt(current.gas_price);
            }

            if (current?.method == 'multiCommit') {
                aggregate.commitCount += BigInt(current.length);
                aggregate.commitTotal += BigInt(current.gas_used);
                aggregate.commitGasPriceCount += BigInt(current.gas_price);
            }

            if (current?.method == 'multiRegister') {
                aggregate.registerCount += BigInt(current.length);
                aggregate.registerTotal += BigInt(current.gas_used);
                aggregate.registerGasPriceCount += BigInt(current.gas_price);
            }

            return aggregate;
        },
        {
            commitTotal: 0n,
            commitGasPriceCount: 0n,
            commitCount: 0n,
            renewTotal: 0n,
            renewGasPriceCount: 0n,
            renewCount: 0n,
            registerTotal: 0n,
            registerGasPriceCount: 0n,
            registerCount: 0n,
        }
    );

    return {
        commitAverage: aggregates.commitTotal / aggregates.commitCount,
        commitGasPriceAverage:
            aggregates.commitGasPriceCount / aggregates.commitCount,
        registerAverage: aggregates.registerTotal / aggregates.registerCount,
        registerGasPriceAverage:
            aggregates.registerGasPriceCount / aggregates.registerCount,
        renewAverage: aggregates.renewTotal / aggregates?.renewCount,
        renewGasPriceAverage:
            aggregates.renewGasPriceCount / aggregates?.renewCount,
        ...aggregates,
    };
};

export type Aggregates = ReturnType<typeof aggregateTotals>;
