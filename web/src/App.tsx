import { TransactionHistory } from './txHistory/TransactionHistory';

const resolverAddress = '0xFC0a4A934410F34A9bb8b4F28bEd6b960C943a7E';

export const App = () => {
    return (
        <div className="w-full h-full min-h-screen bg-light-background-secondary dark:bg-dark-background-secondary px-4">
            <div className="mx-auto w-full max-w-3xl space-y-4 py-8">
                <div className="card w-full p-4 space-y-2">
                    <h1 className="text-xl">UltraBulk.eth</h1>
                    <p>
                        A lightweight and gas-optimized smart contract focused
                        on ENS <span className="font-bold">.eth</span>{' '}
                        registrations and renewals. With as much flexibility as
                        you might need.
                    </p>
                    <div className="text-right">
                        <a
                            href={
                                'https://etherscan.io/contract/' +
                                resolverAddress
                            }
                            className="link"
                            target="_blank"
                        >
                            View on Etherscan
                        </a>
                    </div>
                </div>
                <div className="flex gap-4 w-full flex-col md:flex-row">
                    <div className="card w-full px-4 py-2">
                        <div>Commit Fee</div>
                        <div className="text-right font-bold text-lg">0.00</div>
                    </div>
                    <div className="card w-full px-4 py-2">
                        <div>Registration Fee</div>
                        <div className="text-right font-bold text-lg">0.00</div>
                    </div>
                    <div className="card w-full px-4 py-2">
                        <div>Renewal Fee</div>
                        <div className="text-right font-bold text-lg">0.00</div>
                    </div>
                </div>
                <TransactionHistory contractAddress={resolverAddress} />
            </div>
        </div>
    );
};
