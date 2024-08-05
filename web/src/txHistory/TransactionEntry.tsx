/* eslint-disable jsx-a11y/label-has-associated-control */
import { FC } from 'react';
import { BsFuelPump } from 'react-icons/bs';
import { FiBox, FiChevronDown } from 'react-icons/fi';
import { LuFlame } from 'react-icons/lu';

import { formatFullAndRelativeDate } from '../utils/date';
import { AllMultiReturnTypes } from '../utils/decodeTransaction';
import { useEthUsd } from '../utils/ethUsd';
import { formatThousands } from '../utils/formatThousands';

const formatAddress = (address: string) =>
    address.slice(0, 6) + '...' + address.slice(-4);

export const TransactionEntry: FC<{ tx: AllMultiReturnTypes }> = ({ tx }) => {
    const actionLabel = tx.method;
    const date = new Date(tx.timestamp);
    const ethUsd = useEthUsd(date.getTime());

    const { full, relative } = formatFullAndRelativeDate(date);

    return (
        <div className="p-4 card w-full space-y-3">
            <div className="flex justify-between items-center gap-4 flex-wrap">
                <div>
                    <a
                        href={'https://eth.blockscout.com/tx/' + tx.hash}
                        className="link"
                    >
                        {tx.hash.slice(0, 8)}...
                    </a>
                </div>
                <div
                    className={
                        'flex justify-center items-center gap-1 ' +
                        (tx.result === 'success'
                            ? 'text-green-200'
                            : 'text-red-200')
                    }
                    title="Blocknumber"
                >
                    <FiBox />
                    {tx.block}
                </div>
                <div title={full}>{relative}</div>
                <div>
                    <span className="label label-blue">{actionLabel}</span>
                </div>
                <div className="grow"></div>
                {tx.length > 0 && (
                    <div className="text-center">
                        <div>{tx.length}</div>
                        <div className="text-xs">names</div>
                    </div>
                )}

                <div className="flex flex-col justify-center items-center gap-1">
                    <div className="flex justify-center items-center gap-1">
                        <BsFuelPump />
                        <div>{formatThousands(BigInt(tx.gas_used))}</div>
                    </div>
                    {ethUsd.data ? (
                        <div className="text-sm opacity-70">
                            {Number(
                                Number(
                                    (ethUsd.data *
                                        Number(
                                            (BigInt(tx.gas_used) *
                                                BigInt(tx.gas_price)) /
                                                1_000_000_000_000_000n
                                        )) /
                                        1_000_000
                                )
                            ).toFixed(2)}{' '}
                            USD
                        </div>
                    ) : undefined}
                </div>
                <div className="flex justify-center items-center gap-1">
                    <LuFlame />
                    {(Number(BigInt(tx.gas_price) / 100_000_000n) / 10)
                        .toPrecision(2)
                        .toString()}
                </div>
                <label
                    htmlFor={'car-' + tx.hash}
                    className="cursor-pointer rounded-full p-2 hover:bg-light-background-secondary dark:hover:bg-dark-background-secondary"
                >
                    <FiChevronDown />
                </label>
            </div>
            <input type="checkbox" id={'car-' + tx.hash} className="hidden" />
            <div className="open-if-checkbox space-y-2">
                {['renewAll', 'multiRegister'].includes(tx.method) && (
                    <div className="flex gap-2 border border-light-border dark:border-dark-border p-2 rounded-lg">
                        <div>Names</div>
                        <div>
                            <ul className="grid grid-cols-2 gap-2">
                                {(
                                    tx.decoded_input.parameters[0]
                                        .value as string[]
                                ).map((name, _index) => (
                                    <li>
                                        <a
                                            href={
                                                'https://ens.app/' +
                                                name +
                                                '.eth'
                                            }
                                            className="link"
                                            target="_blank"
                                        >
                                            {name}.eth
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {tx.method === 'multiCommit' && (
                    <div className="flex gap-2 border border-light-border dark:border-dark-border p-2 rounded-lg">
                        <div>Commitments</div>
                        <div>
                            <ul className="grid grid-cols-6 gap-2">
                                {(
                                    tx.decoded_input.parameters[0]
                                        .value as string[]
                                ).map((commitment, _index) => (
                                    <li title={commitment}>
                                        {formatAddress(commitment)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                {tx.length > 0 && (
                    <div className="text-center">
                        <div>
                            {formatThousands(
                                BigInt(tx.gas_used) / BigInt(tx.length)
                            )}
                        </div>
                        <div className="text-xs">Per Name</div>
                    </div>
                )}

                <div className="whitespace-break-spaces break-words w-full overflow-hidden bg-light-background-secondary text-light-text-primary dark:bg-dark-background-secondary dark:text-dark-text-primary rounded-lg p-4">
                    <span>
                        {JSON.stringify(tx.decoded_input, undefined, 2)}
                    </span>
                </div>
            </div>
        </div>
    );
};
