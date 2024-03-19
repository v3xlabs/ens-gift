import { useMemo } from 'react';
import useSWR from 'swr';

import { getTransactions } from './etherscan/getTransactions';
import { TransactionHistory } from './txHistory/TransactionHistory';
import { Aggregates, aggregateTotals } from './utils/aggregateTotals';
import {
    AllMultiReturnTypes,
    decodeTransaction,
} from './utils/decodeTransaction';
import { formatThousands } from './utils/formatThousands';

const contractAddress = '0xFC0a4A934410F34A9bb8b4F28bEd6b960C943a7E';

export const App = () => {
    const { data, isLoading, error } = useSWR(
        '/transactions',
        async () => await getTransactions(contractAddress),
        {
            keepPreviousData: true,
        }
    );

    const decodedTransactions = useMemo(
        () =>
            data?.result.map(decodeTransaction).filter(Boolean) as
                | AllMultiReturnTypes[]
                | undefined,
        [data]
    );

    const totals = useMemo(() => {
        if (!decodedTransactions) return;

        return aggregateTotals(decodedTransactions) as Aggregates;
    }, [decodedTransactions]);

    return (
        <div className="w-full h-full min-h-screen bg-light-background-secondary dark:bg-dark-background-secondary px-4">
            <div className="mx-auto w-full max-w-3xl space-y-4 py-8">
                <div className="card w-full p-4 space-y-2">
                    <h1 className="text-xl">UltraBulk.eth</h1>
                    <p>
                        A lightweight and gas-optimized smart contract focused
                        on ENS <span className="font-bold">.eth</span>{' '}
                        registrations and renewals. With as much flexibility as
                        you might need.
                    </p>
                    <div className="text-right">
                        <a
                            href={
                                'https://etherscan.io/address/' +
                                contractAddress
                            }
                            className="link"
                            target="_blank"
                        >
                            View on Etherscan
                        </a>
                    </div>
                </div>
                <div className="flex gap-4 w-full flex-col md:flex-row">
                    <div className="card w-full px-4 py-2">
                        <div>Commit Fee</div>
                        {totals?.commitAverage ? (
                            <div className="text-right font-bold text-lg">
                                {formatThousands(totals.commitAverage)}
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                    <div className="card w-full px-4 py-2">
                        <div>Registration Fee</div>
                        {totals?.registerAverage ? (
                            <div className="text-right font-bold text-lg">
                                {formatThousands(totals.registerAverage)}
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}{' '}
                    </div>
                    <div className="card w-full px-4 py-2">
                        <div>Renewal Fee</div>
                        {totals?.renewAverage ? (
                            <div className="text-right font-bold text-lg">
                                {formatThousands(totals.renewAverage)}
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}{' '}
                    </div>
                </div>
                <TransactionHistory
                    contractAddress={contractAddress}
                    totals={totals}
                    txs={decodedTransactions}
                    error={error}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};
