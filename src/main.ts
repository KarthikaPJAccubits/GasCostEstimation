

import { DefaultValue } from './utils/defaultValue';
import { ethers } from 'ethers';
import { exec } from 'child_process'
import path from 'path';
import fs from 'fs';
import util from 'util';

async function main() {

    const gasPrice = await ethers.getDefaultProvider().getGasPrice();

    const contractName = "PNFTMarketplaceUpgradable";

    console.log("contractNAME------------", contractName);

    const path1 = './contracts/contracts/' + contractName + ".sol";
    console.log("path.......", path1);
    const path2 = './contracts/artifacts/contracts/' + contractName + ".sol/" + contractName + '.json';
    console.log("path2.......", path2);
    if (fs.existsSync(path1) && fs.existsSync(path2)) {
        console.log("your contract exist")


    }
    else {
        console.log("your contract is not exist in contract folder please add it,")
    }

    var content;

    fs.readFile(path.join(__dirname, "./contracts/artifacts/contracts/" + contractName + '.sol', contractName + ".json"), 'utf8', async function (err, data) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        content = util.format(data);




        const contentJSON = JSON.parse(content);
        const abi = contentJSON.abi;
        console.log("===========abi", abi);
        const address = "0x0000000000000000000000000000000000000000";
        const gasUnits =
            new ethers.Contract(
                address,
                abi,
                ethers.getDefaultProvider()
            );


       // const filterAnonymousMethods = (abi1 = abi) => abi1.filter((name: any) => name);
       
        const groups = abi.filter((element: any) => (element.type === 'function') && (element.stateMutability != "view"))
            .map(async (element: any) => {

                const arr = [];

                for (let i = 0; i < element.inputs.length; i++) {

                    const input = element.inputs[i];

                    arr.push(await DefaultValue(input.type, input));



                }


                const gasEstimation = await gasUnits.estimateGas[element.name].apply(null, arr);




                console.log("========= " + "gasEstimation of " + '\x1b[33m%s\x1b[0m', element.name + "()", " =========");

                const transactionFee = ((gasPrice)).mul(gasEstimation)
                console.log('\n')
                console.log("transactionFee in wei: " + transactionFee.toString());

                console.log("transactionFee in ether: " + ethers.utils.formatUnits(transactionFee, "ether"));
                console.log('\n')




               
            })
    })


}
main();











