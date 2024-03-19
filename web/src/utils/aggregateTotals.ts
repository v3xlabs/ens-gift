import { AllMultiReturnTypes } from './decodeTransaction';

export const aggregateTotals = (txs: AllMultiReturnTypes[]) => {
    const aggregates = txs.reduce(
        (aggregate, current) => {
            if (current?.functionName == 'renewAll') {
                aggregate.renewCount += BigInt(current.length);
                aggregate.renewTotal += BigInt(current.tx.gasUsed);
            }

            if (current?.functionName == 'multiCommit') {
                aggregate.commitCount += BigInt(current.length);
                aggregate.commitTotal += BigInt(current.tx.gasUsed);
            }

            if (current?.functionName == 'multiRegister') {
                aggregate.registerCount += BigInt(current.length);
                aggregate.registerTotal += BigInt(current.tx.gasUsed);
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
