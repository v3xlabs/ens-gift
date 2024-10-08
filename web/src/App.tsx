import { useMemo } from 'react';
import { BsFuelPump } from 'react-icons/bs';
import useSWR from 'swr';

import { getTransactions } from './etherscan/getTransactions';
import { TransactionHistory } from './txHistory/TransactionHistory';
import { Aggregates, aggregateTotals } from './utils/aggregateTotals';
import {
    AllMultiReturnTypes,
    decodeTransaction,
} from './utils/decodeTransaction';
import { useEthUsd } from './utils/ethUsd';
import { formatGas } from './utils/formatGas';
import { formatThousands } from './utils/formatThousands';
import { gasPriceMagic } from './utils/gasMagic';

const contractAddress = '0x7Ff29Bd08AF26495EeB96cb5D80f1813C0410917';

export const App = () => {
    const { data, isLoading, error } = useSWR(
        '/transactions',
        async () => await getTransactions(contractAddress),
        {
            keepPreviousData: true,
        }
    );

    const decodedTransactions = useMemo(() => {
        if (!data || !data.items) return;

        return data?.items.map(decodeTransaction).filter(Boolean) as
            | AllMultiReturnTypes[]
            | undefined;
    }, [data]);

    const totals = useMemo(() => {
        if (!decodedTransactions) return;

        return aggregateTotals(decodedTransactions) as Aggregates;
    }, [decodedTransactions]);

    const { data: currentUSDCPrice } = useEthUsd();

    console.log({ currentUSDCPrice });

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
                                'https://eth.blockscout.com/address/' +
                                contractAddress
                            }
                            className="link"
                            target="_blank"
                        >
                            View on Blockscout
                        </a>
                    </div>
                </div>
                <div className="flex gap-4 w-full flex-col md:flex-row">
                    <div className="card w-full px-4 py-2">
                        <div>Commit Fee</div>
                        {totals?.commitAverage ? (
                            <div>
                                <div className="text-right font-bold text-lg">
                                    {formatThousands(totals.commitAverage)}
                                </div>
                                {currentUSDCPrice ? (
                                    <div className="text-light-text-secondary flex justify-between gap-2 items-center">
                                        <div className="flex items-center gap-1">
                                            <BsFuelPump />
                                            {formatGas(
                                                totals.commitGasPriceAverage
                                            )}
                                        </div>
                                        <div className="text-right flex items-center justify-end">
                                            ~{' '}
                                            {gasPriceMagic(
                                                totals.commitAverage,
                                                totals.commitGasPriceAverage,
                                                currentUSDCPrice
                                            )}{' '}
                                            USD
                                        </div>
                                    </div>
                                ) : undefined}
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                    <div className="card w-full px-4 py-2">
                        <div>Registration Fee</div>
                        {totals?.registerAverage ? (
                            <div>
                                <div className="text-right font-bold text-lg">
                                    {formatThousands(totals.registerAverage)}
                                </div>
                                {currentUSDCPrice ? (
                                    <div className="text-light-text-secondary flex justify-between gap-2 items-center">
                                        <div className="flex items-center gap-1">
                                            <BsFuelPump />
                                            {formatGas(
                                                totals.registerGasPriceAverage
                                            )}
                                        </div>
                                        <div className="text-right flex items-center justify-end">
                                            ~{' '}
                                            {gasPriceMagic(
                                                totals.registerAverage,
                                                totals.registerGasPriceAverage,
                                                currentUSDCPrice
                                            )}{' '}
                                            USD
                                        </div>
                                    </div>
                                ) : undefined}
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}{' '}
                    </div>
                    <div className="card w-full px-4 py-2">
                        <div>Renewal Fee</div>
                        {totals?.renewAverage ? (
                            <div>
                                <div className="text-right font-bold text-lg">
                                    {formatThousands(totals.renewAverage)}
                                </div>
                                <div className="text-light-text-secondary flex justify-between gap-2 items-center">
                                    <div className="flex items-center gap-1">
                                        <BsFuelPump />
                                        {formatGas(totals.renewGasPriceAverage)}
                                    </div>
                                    {currentUSDCPrice ? (
                                        <div className="text-right flex items-center justify-end">
                                            ~{' '}
                                            {gasPriceMagic(
                                                totals.renewAverage,
                                                totals.renewGasPriceAverage,
                                                currentUSDCPrice
                                            )}{' '}
                                            USD
                                        </div>
                                    ) : undefined}
                                </div>
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
