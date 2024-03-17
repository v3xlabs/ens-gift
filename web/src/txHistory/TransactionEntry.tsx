import { FC } from 'react';
import { FiBox } from 'react-icons/fi';
import { LuFlame } from 'react-icons/lu';
import { EtherscanTx } from 'src/etherscan/getTransactions';

export const TransactionEntry: FC<{ txHash: EtherscanTx }> = ({ txHash }) => {
    return (
        <div className="p-4 card w-full">
            <div className="flex justify-between">
                <div>
                    <a
                        href={'https://etherscan.io/txhash/' + txHash.hash}
                        className="link"
                    >
                        {txHash.hash.slice(0, 8)}...
                    </a>
                </div>
                <div className="flex justify-center items-center gap-1">
                    <FiBox />
                    {txHash.blockNumber}
                </div>
                <div>{/* txHash.timestamp */}5 seconds ago</div>
                <div className="flex justify-center items-center gap-1">
                    <LuFlame />
                    {txHash.blockNumber}
                </div>
                <div>{txHash.gasPrice}</div>
                <div>Register</div>
                <div>
                    <span>Per Name</span>
                </div>
            </div>
            <div className="whitespace-break-spaces w-full">
                Transaction: <span>{JSON.stringify(txHash)}</span>
            </div>
        </div>
    );
};
