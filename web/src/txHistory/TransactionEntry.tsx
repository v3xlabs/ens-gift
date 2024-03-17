import { FC } from 'react';
import { EtherscanTx } from 'src/etherscan/getTransactions';

export const TransactionEntry: FC<{ txHash: EtherscanTx }> = ({ txHash }) => {
    return (
        <div className="p-4 card w-full">
            Transaction: <span>{JSON.stringify(txHash)}</span>
        </div>
    );
};
