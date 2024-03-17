import { TransactionHistory } from "./txHistory/TransactionHistory";

export const App = () => {

    return (
        <div className="w-full h-full min-h-screen bg-light-background-secondary dark:bg-dark-background-secondary">
            <div className="mx-auto w-full max-w-2xl space-y-4 py-8">
                <div className="card w-full p-4">
                    <h1 className="text-xl">UltraBulk.eth</h1>
                    <p>
                        A lightweight and gas-optimized smart contract focused on ENS <span className="font-bold">.eth</span> registrations and renewals.
                        With as much flexibility as you might need.
                    </p>
                </div>
                <div className="flex gap-4 w-full flex-col md:flex-row">
                    <div className="card w-full p-4">Commit Fee</div>
                    <div className="card w-full p-4">Registration Fee</div>
                    <div className="card w-full p-4">Renewal Fee</div>
                </div>
                <TransactionHistory contractAddress="0xFC0a4A934410F34A9bb8b4F28bEd6b960C943a7E" />
            </div>
        </div>
    );
};