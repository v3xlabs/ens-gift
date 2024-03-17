import { FC } from 'react';
import { FiBox } from 'react-icons/fi';
import { LuFlame } from 'react-icons/lu';
import { EtherscanTx } from 'src/etherscan/getTransactions';

const deriveLabelFromFunctionName = (functionName: string) => {
    if (functionName.startsWith('multiRegister(')) return 'Register';

    if (functionName.startsWith('multiCommit(')) return 'Commit';

    if (functionName.startsWith('renewAll(')) return 'Renew';

    return `Unknown (${functionName.split('(').shift()})`;
};

export const TransactionEntry: FC<{ txHash: EtherscanTx }> = ({ txHash }) => {
    const actionLabel = deriveLabelFromFunctionName(txHash.functionName);

    return (
        <div className="p-4 card w-full">
            <div className="flex justify-between">
                <div>
                    <a
                        href={'https://etherscan.io/tx/' + txHash.hash}
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
                    {(Number(BigInt(txHash.gasPrice) / 100_000_000n) / 10)
                        .toPrecision(2)
                        .toString()}
                </div>
                <div>
                    <span className="label label-blue">{actionLabel}</span>
                </div>
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
