/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC } from 'react';
import { BsFuelPump } from 'react-icons/bs';
import { FiBox, FiChevronDown } from 'react-icons/fi';
import { LuFlame } from 'react-icons/lu';
import { decodeFunctionData } from 'viem';

import { ultraBulkAbi } from '../abi';
import { EtherscanTx } from '../etherscan/getTransactions';
import { formatFullAndRelativeDate } from '../utils/date';
import { useEthUsd } from '../utils/ethUsd';
import { formatThousands } from '../utils/formatThousands';
import { gasToEth } from '../utils/gas';

type DecodedFunction<K, V> = { functionName: K; args: V };
type MultiRegisterType = DecodedFunction<
    'multiRegister',
    [string[], string[], bigint, string, string]
>;
type MultiCommitType = DecodedFunction<'multiCommit', [string[]]>;
type MultiRenewType = DecodedFunction<'renewAll', [string[], bigint, bigint]>;

type AllMultiReturnTypes = MultiRegisterType | MultiCommitType | MultiRenewType;

const decodeFunctionInput = (
    inputData: string,
    to: string
): AllMultiReturnTypes | undefined => {
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
            return {
                functionName,
                args,
            } as MultiRegisterType;
        }

        if (functionName == 'multiCommit' && args) {
            return {
                functionName,
                args,
            } as MultiCommitType;
        }

        if (functionName == 'renewAll' && args) {
            return {
                functionName,
                args,
            } as MultiRenewType;
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

const getNameLength = (inputData?: AllMultiReturnTypes) => {
    if (!inputData) return;

    if (inputData.functionName == 'multiRegister') {
        return inputData.args[0].length;
    }

    if (inputData.functionName == 'multiCommit') {
        return inputData.args[0].length;
    }

    if (inputData.functionName == 'renewAll') {
        return inputData.args[0].length;
    }
};

export const TransactionEntry: FC<{ txHash: EtherscanTx }> = ({ txHash }) => {
    const actionLabel = deriveLabelFromFunctionName(
        txHash.functionName,
        txHash.to
    );
    const inputData = decodeFunctionInput(txHash.input, txHash.to);
    const ethUsd = useEthUsd(Number(txHash.timeStamp) * 1000);

    const namesLength = getNameLength(inputData);

    const { full, relative } = formatFullAndRelativeDate(
        new Date(Number(txHash.timeStamp) * 1000)
    );

    return (
        <div className="p-4 card w-full space-y-3">
            <div className="flex justify-between items-center gap-4 flex-wrap">
                <div>
                    <a
                        href={'https://etherscan.io/tx/' + txHash.hash}
                        className="link"
                    >
                        {txHash.hash.slice(0, 8)}...
                    </a>
                </div>
                <div
                    className="flex justify-center items-center gap-1"
                    title="Blocknumber"
                >
                    <FiBox />
                    {txHash.blockNumber}
                </div>
                <div title={full}>{relative}</div>
                <div>
                    <span className="label label-blue">{actionLabel}</span>
                </div>
                <div className="grow"></div>
                {namesLength && (
                    <div className="text-center">
                        <div>{namesLength}</div>
                        <div className="text-xs">names</div>
                    </div>
                )}
                {namesLength && (
                    <div className="text-center">
                        <div>
                            {formatThousands(
                                BigInt(txHash.gasUsed) / BigInt(namesLength)
                            )}
                        </div>
                        <div className="text-xs">Per Name</div>
                    </div>
                )}
                <div className="flex flex-col justify-center items-center gap-1">
                    <div className="flex justify-center items-center gap-1">
                        <BsFuelPump />
                        <div>{formatThousands(BigInt(txHash.gasUsed))}</div>
                    </div>
                    {ethUsd.data && (
                        <div className="text-sm opacity-70">
                            {(
                                ethUsd.data *
                                gasToEth(
                                    BigInt(txHash.gasUsed),
                                    BigInt(txHash.gasPrice)
                                )
                            ).toFixed(2)}{' '}
                            USD
                        </div>
                    )}
                </div>
                <div className="flex justify-center items-center gap-1">
                    <LuFlame />
                    {(Number(BigInt(txHash.gasPrice) / 100_000_000n) / 10)
                        .toPrecision(2)
                        .toString()}
                </div>
                <label
                    htmlFor={'car-' + txHash.hash}
                    className="cursor-pointer rounded-full p-2 hover:bg-light-background-secondary dark:hover:bg-dark-background-secondary"
                >
                    <FiChevronDown />
                </label>
            </div>
            <input
                type="checkbox"
                id={'car-' + txHash.hash}
                className="hidden"
            />
            <div className="open-if-checkbox space-y-2">
                {inputData?.functionName === 'multiRegister' ||
                    (inputData?.functionName === 'renewAll' && (
                        <div className="flex gap-2 border border-light-border dark:border-dark-border p-2 rounded-lg">
                            <div>Names</div>
                            <div>
                                <ul className="grid grid-cols-2 gap-2">
                                    {inputData?.args[0].map((name, _index) => (
                                        <li>
                                            <a
                                                href={'https://ens.app/' + name}
                                                className="link"
                                                target="_blank"
                                            >
                                                {name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                {inputData?.functionName === 'multiCommit' && (
                    <div className="flex gap-2 border border-light-border dark:border-dark-border p-2 rounded-lg">
                        <div>Commitments</div>
                        <div>
                            <ul className="grid grid-cols-2 gap-2">
                                {inputData?.args[0].map(
                                    (commitment, _index) => (
                                        <li>{commitment}</li>
                                    )
                                )}
                            </ul>
                        </div>
                    </div>
                )}
                <div className="whitespace-break-spaces break-words w-full overflow-hidden bg-light-background-secondary rounded-lg p-4">
                    <span>{JSON.stringify(txHash)}</span>
                </div>
            </div>
        </div>
    );
};
