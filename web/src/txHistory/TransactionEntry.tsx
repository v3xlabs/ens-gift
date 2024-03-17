import { FC } from 'react';
import { FiBox } from 'react-icons/fi';
import { LuFlame } from 'react-icons/lu';
import { decodeFunctionData } from 'viem';

import { ultraBulkAbi } from '../abi';
import { EtherscanTx } from '../etherscan/getTransactions';

const decodeFunctionInput = (inputData: string, to: string) => {
    // If contract Create
    if (to == '') {
        return;
    }

    try {
        const { args, functionName } = decodeFunctionData({
            abi: ultraBulkAbi,
            data: inputData as '0x{string}',
        });

        if (functionName == 'multiRegister' && args) {
            console.log(args);
            const names = args[0] as string[];
            const owners = args[1] as string[];
            const duration = args[2] as bigint;
            const secret = args[3] as string;
            const resolver = args[4] as string;

            return { functionName, names, owners, duration, secret, resolver };
        }
    } catch (error) {
        console.error({ e: error });
    }
};

const deriveLabelFromFunctionName = (functionName: string, to: string) => {
    if (to == '') return 'Deploy';

    if (functionName.startsWith('multiRegister(')) return 'Register';

    if (functionName.startsWith('multiCommit(')) return 'Commit';

    if (functionName.startsWith('renewAll(')) return 'Renew';

    return `Unknown (${functionName.split('(').shift()})`;
};

export const TransactionEntry: FC<{ txHash: EtherscanTx }> = ({ txHash }) => {
    const actionLabel = deriveLabelFromFunctionName(
        txHash.functionName,
        txHash.to
    );
    const inputData = decodeFunctionInput(txHash.input, txHash.to);

    const namesLength =
        inputData?.functionName == 'multiRegister'
            ? inputData.names.length
            : undefined;

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
                {namesLength && (
                    <div className="text-center">
                        <div>{}</div>
                        <div className="text-xs">names</div>
                    </div>
                )}
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
