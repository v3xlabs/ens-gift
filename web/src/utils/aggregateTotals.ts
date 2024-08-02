import { AllMultiReturnTypes } from './decodeTransaction';

export const aggregateTotals = (txs: AllMultiReturnTypes[]) => {
    const aggregates = txs.reduce(
        (aggregate, current) => {
            if (current?.method == 'renewAll') {
                aggregate.renewCount += BigInt(current.length);
                aggregate.renewTotal += BigInt(current.gas_used);
            }

            if (current?.method == 'multiCommit') {
                aggregate.commitCount += BigInt(current.length);
                aggregate.commitTotal += BigInt(current.gas_used);
            }

            if (current?.method == 'multiRegister') {
                aggregate.registerCount += BigInt(current.length);
                aggregate.registerTotal += BigInt(current.gas_used);
            }

            return aggregate;
        },
        {
            commitTotal: 0n,
            commitCount: 0n,
            renewTotal: 0n,
            renewCount: 0n,
            registerTotal: 0n,
            registerCount: 0n,
        }
    );

    return {
        commitAverage: aggregates.commitTotal / aggregates.commitCount,
        registerAverage: aggregates.registerTotal / aggregates.registerCount,
        renewAverage: aggregates.renewTotal / aggregates?.renewCount,
        ...aggregates,
    };
};

export type Aggregates = ReturnType<typeof aggregateTotals>;
