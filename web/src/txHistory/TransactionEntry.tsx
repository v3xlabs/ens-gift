/* eslint-disable jsx-a11y/label-has-associated-control */
import { clsx } from 'clsx';
import { FC } from 'react';
import { BsFuelPump } from 'react-icons/bs';
import { FiBox, FiChevronDown } from 'react-icons/fi';

import { formatFullAndRelativeDate } from '../utils/date';
import { AllMultiReturnTypes } from '../utils/decodeTransaction';
import { useEthUsd } from '../utils/ethUsd';
import { formatGas } from '../utils/formatGas';
import { formatThousands } from '../utils/formatThousands';

const formatAddress = (address: string) =>
    address.slice(0, 6) + '...' + address.slice(-4);

export const TransactionEntry: FC<{ tx: AllMultiReturnTypes }> = ({ tx }) => {
    const actionLabel = tx.method;
    const date = new Date(tx.timestamp);
    const ethUsd = useEthUsd(date.getTime());

    const { full, relative } = formatFullAndRelativeDate(date);

    return (
        <div
            className={clsx(
                'p-4 card w-full space-y-3',
                tx.result !== 'success' &&
                    'bg-red-100 dark:bg-red-900 outline-red-500 outline-2'
            )}
        >
            <div className="flex justify-between items-center gap-4 flex-wrap">
                <div className="flex flex-col">
                    <div className="flex gap-3">
                        <div
                            className="flex justify-center items-center gap-1"
                            title="Blocknumber"
                        >
                            <FiBox />
                            {tx.block}
                        </div>
                        <div>
                            <span className="label label-blue">
                                {actionLabel}
                            </span>
                        </div>
                    </div>
                    <div
                        title={full}
                        className="text-neutral-400 text-sm leading-4"
                    >
                        {relative}
                    </div>
                </div>
                <div className="grow"></div>
                {tx.length > 0 && (
                    <div className="text-center">
                        <div>{tx.length}</div>
                        <div className="text-xs">names</div>
                    </div>
                )}
                {tx.length > 0 && (
                    <div className="text-center">
                        <div className="text-sm">
                            <span>
                                {formatThousands(
                                    BigInt(tx.gas_used) / BigInt(tx.length)
                                )}
                                {tx.length > 1 && ' each'}
                            </span>
                        </div>
                        {tx.length > 1 && (
                            <span className="text-xs">
                                <span>
                                    {formatThousands(BigInt(tx.gas_used))}
                                </span>{' '}
                                total
                            </span>
                        )}
                    </div>
                )}
                <div className="flex flex-col justify-center items-center gap-1">
                    <div className="flex justify-center items-center gap-1">
                        <BsFuelPump />
                        <div>{formatGas(BigInt(tx.gas_price))}</div>
                    </div>
                    {ethUsd.data ? (
                        <div className="text-sm opacity-70">
                            {Number(
                                Number(
                                    Number(
                                        BigInt(
                                            BigInt(ethUsd.data) *
                                                (BigInt(tx.gas_used) *
                                                    BigInt(tx.gas_price))
                                        ) / 1_000_000_000_000_000n
                                    ) / 1_000_000_000
                                )
                            ).toFixed(2)}{' '}
                            USD
                        </div>
                    ) : undefined}
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
                <div className="border border-light-border dark:border-dark-border p-2 rounded-lg">
                    <div className="flex gap-2">
                        <div>TxHash</div>
                        <a
                            href={'https://eth.blockscout.com/tx/' + tx.hash}
                            className="link"
                            target="_blank"
                        >
                            {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                        </a>
                    </div>
                    {['renewAll', 'multiRegister'].includes(tx.method) && (
                        <div className="flex gap-2">
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
                        <div className="flex gap-2">
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
                </div>
                <div className="flex w-full justify-center">
                    <label
                        htmlFor={'car-' + tx.hash + '-debug'}
                        className="flex items-center gap-1 hover:bg-neutral-100 px-2 py-1 rounded-md cursor-pointer"
                    >
                        Show Debug <FiChevronDown />
                    </label>
                </div>
                <input
                    type="checkbox"
                    id={'car-' + tx.hash + '-debug'}
                    className="hidden peer"
                />
                <div className="peer-checked:block hidden whitespace-break-spaces break-words w-full overflow-hidden bg-light-background-secondary text-black rounded-lg p-4">
                    <span>
                        {JSON.stringify(tx.decoded_input, undefined, 2)}
                    </span>
                </div>
            </div>
        </div>
    );
};
