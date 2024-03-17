import { FC } from 'react';
import useSWR from 'swr';

import { getTransactions } from '../etherscan/getTransactions';
import { TransactionEntry } from './TransactionEntry';

export const TransactionHistory: FC<{ contractAddress: string }> = ({
    contractAddress,
}) => {
    const { data, isLoading, error } = useSWR(
        '/transactions',
        async () => await getTransactions(contractAddress),
        {
            keepPreviousData: true,
        }
    );

    return (
        <div>
            <h2>Recent Transactions</h2>
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
            {data && (
                <>
                    {data.result.length === 0 && (
                        <div>
                            <p>No Txs found</p>
                        </div>
                    )}
                    {data.result.length > 0 && (
                        <div className="space-y-2">
                            {data.result.map((tx) => (
                                <TransactionEntry txHash={tx} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
