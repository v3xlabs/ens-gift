import { decodeFunctionData } from 'viem';

import { ultraBulkAbi } from '../abi';
import { BlockscoutTx } from '../etherscan/getTransactions';

type MultiRegisterType = BlockscoutTx<'multiRegister'>;
type MultiCommitType = BlockscoutTx<'multiCommit'>;
type MultiRenewType = BlockscoutTx<'renewAll'>;

export type AllMultiReturnTypes =
    | MultiRegisterType
    | MultiCommitType
    | MultiRenewType;

export const decodeTransaction = (
    tx: BlockscoutTx
): AllMultiReturnTypes | undefined => {
    // If contract Create
    if (tx.to == '') {
        return;
    }

    try {
        const { args, functionName } = decodeFunctionData({
            abi: ultraBulkAbi,
            data: tx.input as '0x{string}',
        });

        const length = getNameLength(functionName, args as any);

        if (functionName == 'multiRegister' && args) {
            return {
                functionName,
                args,
                length,
                tx,
            } as MultiRegisterType;
        }

        if (functionName == 'multiCommit' && args) {
            return {
                functionName,
                args,
                length,
                tx,
            } as MultiCommitType;
        }

        if (functionName == 'renewAll' && args) {
            return {
                functionName,
                args,
                length,
                tx,
            } as MultiRenewType;
        }
    } catch (error) {
        console.error({ e: error });
    }
};

export const deriveLabelFromFunctionName = (
    functionName: string,
    to: string
) => {
    if (to == '') return 'Deploy';

    if (functionName.startsWith('multiRegister')) return 'Register';

    if (functionName.startsWith('multiCommit')) return 'Commit';

    if (functionName.startsWith('renewAll')) return 'Renew';

    return `Unknown (${functionName.split('(').shift()})`;
};

const getNameLength = (functionName: string, arguments_: unknown[][]) => {
    if (functionName == 'multiRegister') {
        return arguments_[0].length;
    }

    if (functionName == 'multiCommit') {
        return arguments_[0].length;
    }

    if (functionName == 'renewAll') {
        return arguments_[0].length;
    }
};
