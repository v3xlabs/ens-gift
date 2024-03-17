import { FC } from "react";

export const TransactionEntry: FC<{txHash: string}> = (txHash) => {

    return (
        <div className="p-4 card w-full">
            Transaction: <span>{txHash}</span>
        </div>
    )
};
