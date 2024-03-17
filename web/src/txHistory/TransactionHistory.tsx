import { FC } from "react";
import useSWR from 'swr';

const resolverAddress = "0xfc0a4a934410f34a9bb8b4f28bed6b960c943a7e";

type EtherscanTx = {
    "blockNumber": string; // "19453253",
    "timeStamp": string; // "1710662567",
    "hash": string; // "0x98ad1edfd22852f5ba4ac8deae943b700acb56da259d4fb19770fc3e5849e130",
    "nonce": string; // "527",
    "blockHash": string; // "0xc8305621d04ca2ce7339538f45cb7415b25e515955256260f9a955a0cc7a0e6c",
    "transactionIndex": string; // "88",
    "from": string; // "0x225f137127d9067788314bc7fcc1f36746a3c3b5",
    "to": string; // "",
    "value": string; // "0",
    "gas": string; // "1035099",
    "gasPrice": string; // "27000000000",
    "isError": string; // "0",
    "txreceipt_status": string; // "1",
    "input": string; // "0x608060405234801561001057600080fd5b50604051610d63380380610d6383398101604081905261002f91610095565b600080546001600160a01b031916339081178255604051909182917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a350600180546001600160a01b0319166001600160a01b03929092169190911790556100c5565b6000602082840312156100a757600080fd5b81516001600160a01b03811681146100be57600080fd5b9392505050565b610c8f806100d46000396000f3fe6080604052600436106100865760003560e01c8063590e1ae311610059578063590e1ae3146100d95780638da5cb5b146100e1578063d16050e61461011d578063f2fde38b14610130578063f77c47911461015057600080fd5b80630562a37e1461008b578063194fba10146100a05780632c7e9b39146100b35780633b7fb413146100c6575b600080fd5b61009e61009936600461072f565b610170565b005b61009e6100ae3660046107d2565b610384565b61009e6100c1366004610865565b6103f1565b61009e6100d43660046108b6565b610497565b61009e610568565b3480156100ed57600080fd5b50600054610101906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b61009e61012b366004610939565b6105c1565b34801561013c57600080fd5b5061009e61014b36600461097b565b610652565b34801561015c57600080fd5b50600154610101906001600160a01b031681565b8685146101c45760405162461bcd60e51b815260206004820181905260248201527f6e616d657320616e64206f776e657273206c656e677468206d69736d6174636860448201526064015b60405180910390fd5b6001546000906001600160a01b03166383e7f6ff8a8a84816101e8576101e861099d565b90506020028101906101fa91906109b3565b886040518463ffffffff1660e01b815260040161021993929190610a23565b602060405180830381865afa158015610236573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061025a9190610a47565b90508760005b81811015610328576001546001600160a01b031663f7a16963848d8d8581811061028c5761028c61099d565b905060200281019061029e91906109b3565b8d8d878181106102b0576102b061099d565b90506020020160208101906102c5919061097b565b8c8c8c8c6040518963ffffffff1660e01b81526004016102eb9796959493929190610a60565b6000604051808303818588803b15801561030457600080fd5b505af1158015610318573d6000803e3d6000fd5b5050505050806001019050610260565b60006103348385610ac5565b90508034111561037657336108fc61034c8334610ae2565b6040518115909202916000818181858888f19350505050158015610374573d6000803e3d6000fd5b505b505050505050505050505050565b6040516302b151bf60e11b81523090630562a37e906103b6908a908a908a908a908a908a908a90600090600401610b3c565b600060405180830381600087803b1580156103d057600080fd5b505af11580156103e4573d6000803e3d6000fd5b5050505050505050505050565b8260005b8181101561048f576001546001600160a01b031663acf1a841848888858181106104215761042161099d565b905060200281019061043391906109b3565b886040518563ffffffff1660e01b815260040161045293929190610a23565b6000604051808303818588803b15801561046b57600080fd5b505af115801561047f573d6000803e3d6000fd5b50505050508060010190506103f5565b505050505050565b6000546001600160a01b031633146104c15760405162461bcd60e51b81526004016101bb90610c23565b6000836001600160a01b03163484846040516104de929190610c49565b60006040518083038185875af1925050503d806000811461051b576040519150601f19603f3d011682016040523d82523d6000602084013e610520565b606091505b50509050806105625760405162461bcd60e51b815260206004820152600e60248201526d195d1a18d85b1b0819985a5b195960921b60448201526064016101bb565b50505050565b6000546001600160a01b031633146105925760405162461bcd60e51b81526004016101bb90610c23565b60405133904780156108fc02916000818181858888f193505050501580156105be573d6000803e3d6000fd5b50565b8060005b81811015610562576001546001600160a01b031663f14fcbc88585848181106105f0576105f061099d565b905060200201356040518263ffffffff1660e01b815260040161061591815260200190565b600060405180830381600087803b15801561062f57600080fd5b505af1158015610643573d6000803e3d6000fd5b505050508060010190506105c5565b6000546001600160a01b0316331461067c5760405162461bcd60e51b81526004016101bb90610c23565b600080546001600160a01b0319166001600160a01b0383169081178255604051909133917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a350565b60008083601f8401126106d957600080fd5b50813567ffffffffffffffff8111156106f157600080fd5b6020830191508360208260051b850101111561070c57600080fd5b9250929050565b80356001600160a01b038116811461072a57600080fd5b919050565b60008060008060008060008060c0898b03121561074b57600080fd5b883567ffffffffffffffff8082111561076357600080fd5b61076f8c838d016106c7565b909a50985060208b013591508082111561078857600080fd5b506107958b828c016106c7565b90975095505060408901359350606089013592506107b560808a01610713565b91506107c360a08a01610713565b90509295985092959890939650565b600080600080600080600060a0888a0312156107ed57600080fd5b873567ffffffffffffffff8082111561080557600080fd5b6108118b838c016106c7565b909950975060208a013591508082111561082a57600080fd5b506108378a828b016106c7565b909650945050604088013592506060880135915061085760808901610713565b905092959891949750929550565b6000806000806060858703121561087b57600080fd5b843567ffffffffffffffff81111561089257600080fd5b61089e878288016106c7565b90989097506020870135966040013595509350505050565b6000806000604084860312156108cb57600080fd5b6108d484610713565b9250602084013567ffffffffffffffff808211156108f157600080fd5b818601915086601f83011261090557600080fd5b81358181111561091457600080fd5b87602082850101111561092657600080fd5b6020830194508093505050509250925092565b6000806020838503121561094c57600080fd5b823567ffffffffffffffff81111561096357600080fd5b61096f858286016106c7565b90969095509350505050565b60006020828403121561098d57600080fd5b61099682610713565b9392505050565b634e487b7160e01b600052603260045260246000fd5b6000808335601e198436030181126109ca57600080fd5b83018035915067ffffffffffffffff8211156109e557600080fd5b60200191503681900382131561070c57600080fd5b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b604081526000610a376040830185876109fa565b9050826020830152949350505050565b600060208284031215610a5957600080fd5b5051919050565b60c081526000610a7460c08301898b6109fa565b6001600160a01b0397881660208401526040830196909652506060810193909352908416608083015290921660a09092019190915292915050565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417610adc57610adc610aaf565b92915050565b81810381811115610adc57610adc610aaf565b8183526000602080850194508260005b85811015610b31576001600160a01b03610b1e83610713565b1687529582019590820190600101610b05565b509495945050505050565b60c08082528101889052600060e060058a901b830181019083018b835b8c811015610bcd5785840360df190183528135368f9003601e19018112610b7f57600080fd5b8e01602081810191359067ffffffffffffffff821115610b9e57600080fd5b813603831315610bad57600080fd5b610bb88783856109fa565b96509485019493909301925050600101610b59565b5050508281036020840152610be381898b610af5565b915050856040830152846060830152610c0760808301856001600160a01b03169052565b6001600160a01b03831660a08301529998505050505050505050565b6020808252600c908201526b15539055551213d49256915160a21b604082015260600190565b818382376000910190815291905056fea26469706673582212205e8eb67cb463b1f94275f76d794ca62cbdb019444c0d7d27f5c74884640693fa64736f6c63430008160033000000000000000000000000283af0b28c62c092c9727f1ee09c02ca627eb7f5",
    "contractAddress": string; // "0xfc0a4a934410f34a9bb8b4f28bed6b960c943a7e",
    "cumulativeGasUsed": string; // "4870821",
    "gasUsed": string; // "796448",
    "confirmations": string; //"1410",
    "methodId": string; // "0x60806040",
    "functionName": string; //"atInversebrah(int248 a, uint48[] b, uint32 c, bytes20[] d, bytes30[] e)"
};

type EtherscanTxListResponse = {
	"status": "1",
	"message": "OK-Missing/Invalid API Key, rate limit of 1/5sec applied",
	"result": EtherscanTx[]
};

const getTransactions = async () => {
    const response = await fetch(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${resolverAddress}&startblock=0&endblock=99999999&page=1&offset=1000&sort=desc&apikey=YourApiKeyToken`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

    const data = await response.json() as EtherscanTxListResponse;

    if (data.status === "1") return data;

    throw new Error('Failed to fetch transactions');
};

export const TransactionHistory: FC<{ contractAddress: string }> = ({ contractAddress }) => {
    // const {} = 
    const { data } = useSWR('/transactions', async () => await getTransactions());

    return (
        <div>
            hi
            {data && JSON.stringify(data)}
        </div>
    )
};