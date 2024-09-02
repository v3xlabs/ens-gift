import { FC } from 'react';
import { AllMultiReturnTypes } from 'src/utils/decodeTransaction';

import { PredictNext } from './PredictNext';
import { TransactionEntry } from './TransactionEntry';

export const TransactionHistory: FC<{
    contractAddress: string;
    txs?: (AllMultiReturnTypes | undefined)[];
    totals: any;
    error: any;
    isLoading: boolean;
}> = ({ txs, error, isLoading }) => {
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center gap-4 flex-wrap">
                <h2 className="px-2 py-2 font-bold text-light-text-secondary dark:text-dark-text-secondary">
                    Recent Transactions
                </h2>
                <PredictNext />
            </div>
            {isLoading && (
                <div className="card w-full p-4">
                    <p>Loading...</p>
                </div>
            )}
            {error && (
                <div className="card w-full p-4">
                    <p>Failed to fetch transactions</p>
                    <code>{error.message}</code>
                </div>
            )}
            {txs && (
                <>
                    {txs.length === 0 && (
                        <div>
                            <p>No Txs found</p>
                        </div>
                    )}
                    {txs.length > 0 && (
                        <div className="space-y-2">
                            {txs.filter(Boolean).map((tx) => (
                                <TransactionEntry tx={tx!} key={tx!.hash} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
