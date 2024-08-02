export type BlockscoutTx<T> = {
    timestamp: string;
    fee: {
        type: string;
        value: string;
    };
    gas_limit: string;
    block: number;
    status: string;
    method: T;
    confirmations: number;
    type: number;
    exchange_rate: string;
    to: {
        ens_domain_name: string | null;
        hash: string;
        implementation_address: string | null;
        implementation_name: string | null;
        implementations: string[];
        is_contract: boolean;
        is_verified: boolean;
        metadata: string | null;
        name: string | null;
        private_tags: string[];
        public_tags: string[];
        watchlist_names: string[];
    };
    tx_burnt_fee: string;
    max_fee_per_gas: string;
    result: string;
    hash: string;
    gas_price: string;
    priority_fee: string;
    base_fee_per_gas: string;
    from: {
        ens_domain_name: string | null;
        hash: string;
        implementation_address: string | null;
        implementation_name: string | null;
        implementations: string[];
        is_contract: boolean;
        is_verified: boolean;
        metadata: string | null;
        name: string | null;
        private_tags: string[];
        public_tags: string[];
        watchlist_names: string[];
    };
    token_transfers: any;
    tx_types: string[];
    gas_used: string;
    created_contract: any;
    position: number;
    nonce: number;
    has_error_in_internal_txs: boolean;
    actions: any[];
    decoded_input: {
        method_call: string;
        method_id: string;
        parameters: {
            name: string;
            type: string;
            value: string | string[];
        }[];
    };
    token_transfers_overflow: any;
    raw_input: string;
    value: string;
    max_priority_fee_per_gas: string;
    revert_reason: string | null;
    confirmation_duration: [number, number];
    tx_tag: string | null;
};

export type BlockscoutTxListResponse = {
    items: BlockscoutTx[];
    next_page_params: {
        block_number: number;
        fee: string;
        hash: string;
        index: number;
        inserted_at: string;
        items_count: number;
        value: string;
    };
};

export const getTransactions = async (
    contractAddress: string
): Promise<BlockscoutTxListResponse> => {
    const response = await fetch(
        `https://eth.blockscout.com/api/v2/addresses/${contractAddress}/transactions?filter=to`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    );

    const data = (await response.json()) as BlockscoutTxListResponse;

    if (data.items.length > 0) {
        return data;
    }

    throw new Error('Failed to fetch transactions');
};
