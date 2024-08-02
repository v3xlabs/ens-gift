import { BlockscoutTx } from '../etherscan/getTransactions';

type MultiRegisterType = BlockscoutTx<'multiRegister'> & { length: number };
type MultiCommitType = BlockscoutTx<'multiCommit'> & { length: number };
type MultiRenewType = BlockscoutTx<'renewAll'> & { length: number };

export type AllMultiReturnTypes =
    | MultiRegisterType
    | MultiCommitType
    | MultiRenewType;

export const decodeTransaction = (
    tx: BlockscoutTx<any>
): AllMultiReturnTypes | undefined => {
    // If contract Create skip
    if (!tx.to) {
        return;
    }

    if (
        tx.method == 'multiRegister' &&
        Array.isArray(tx.decoded_input.parameters[0].value)
    ) {
        return {
            ...tx,
            length: tx.decoded_input.parameters[0].value.length,
        } as MultiRegisterType;
    }

    if (tx.method == 'multiCommit') {
        return {
            ...tx,
            length: tx.decoded_input.parameters[0].value.length,
        } as MultiCommitType;
    }

    if (tx.method == 'renewAll') {
        return {
            ...tx,
            length: tx.decoded_input.parameters[0].value.length,
        } as MultiRenewType;
    }

    // try {
    //     const { args, functionName } = decodeFunctionData({
    //         abi: ultraBulkAbi,
    //         data: tx.input as '0x{string}',
    //     });

    //     const length = getNameLength(functionName, args as any);

    //     if (functionName == 'multiRegister' && args) {
    //         return {
    //             functionName,
    //             args,
    //             length,
    //             tx,
    //         } as MultiRegisterType;
    //     }

    //     if (functionName == 'multiCommit' && args) {
    //         return {
    //             functionName,
    //             args,
    //             length,
    //             tx,
    //         } as MultiCommitType;
    //     }

    //     if (functionName == 'renewAll' && args) {
    //         return {
    //             functionName,
    //             args,
    //             length,
    //             tx,
    //         } as MultiRenewType;
    //     }
    // } catch (error) {
    //     console.error({ e: error });
    // }
    return tx;
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
