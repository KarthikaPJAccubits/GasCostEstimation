"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var defaultValue_1 = require("./utils/defaultValue");
var ethers_1 = require("ethers");
var child_process_1 = require("child_process");
var path_1 = require("path");
var fs_1 = require("fs");
var util_1 = require("util");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var gasPrice, contractName, path1, path2, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ethers_1.ethers.getDefaultProvider().getGasPrice()];
                case 1:
                    gasPrice = _a.sent();
                    contractName = "AshlyNFTMarketplaceUpgradable";
                    console.log("contractNAME------------", contractName);
                    child_process_1.exec("npx hardhat compile", { cwd: './contracts' }, function (error, stdout, stderr) {
                        if (error) {
                            console.log("error: " + error.message);
                        }
                        if (stderr) {
                            console.log("stderr: " + stderr);
                        }
                        console.log("stdout: " + stdout);
                    });
                    path1 = './contracts/contracts/' + contractName + ".sol";
                    console.log("path.......", path1);
                    path2 = './contracts/artifacts/contracts/' + contractName + ".sol/" + contractName + '.json';
                    console.log("path2.......", path2);
                    if (fs_1["default"].existsSync(path1) && fs_1["default"].existsSync(path2)) {
                        console.log("your contract exist");
                    }
                    else {
                    }
                    fs_1["default"].readFile(path_1["default"].join(__dirname, "./contracts/artifacts/contracts/" + contractName + '.sol', contractName + ".json"), 'utf8', function (err, data) {
                        return __awaiter(this, void 0, void 0, function () {
                            var contentJSON, abi, address, gasUnits, filterAnonymousMethods, groups;
                            var _this = this;
                            return __generator(this, function (_a) {
                                if (err) {
                                    console.log(err);
                                    process.exit(1);
                                }
                                content = util_1["default"].format(data);
                                console.log(content, "content============");
                                contentJSON = JSON.parse(content);
                                abi = contentJSON.abi;
                                console.log("===========abi", abi);
                                address = "0x0000000000000000000000000000000000000000";
                                gasUnits = new ethers_1.ethers.Contract(address, abi, ethers_1.ethers.getDefaultProvider());
                                filterAnonymousMethods = function (abi1) {
                                    if (abi1 === void 0) { abi1 = abi; }
                                    return abi1.filter(function (name) { return name; });
                                };
                                console.log("------------------filterAnonymousMethods", filterAnonymousMethods);
                                groups = abi.filter(function (element) { return (element.type === 'function') && (element.stateMutability != "view"); })
                                    .map(function (element) { return __awaiter(_this, void 0, void 0, function () {
                                    function sleep(ms) {
                                        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
                                    }
                                    var arr, i, input, _a, _b, gasEstimation, transactionFee;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                console.log(element.name, "function name------------");
                                                arr = [];
                                                console.log("print.............", element.inputs.length);
                                                i = 0;
                                                _c.label = 1;
                                            case 1:
                                                if (!(i < element.inputs.length)) return [3 /*break*/, 4];
                                                console.log("hi-------------");
                                                input = element.inputs[i];
                                                console.log("From the loop --------------" + input.type.toString());
                                                _b = (_a = arr).push;
                                                return [4 /*yield*/, defaultValue_1.DefaultValue(input.type, input)];
                                            case 2:
                                                _b.apply(_a, [_c.sent()]);
                                                _c.label = 3;
                                            case 3:
                                                i++;
                                                return [3 /*break*/, 1];
                                            case 4:
                                                console.log("arr-------------", arr);
                                                return [4 /*yield*/, gasUnits.estimateGas[element.name].apply(null, arr)];
                                            case 5:
                                                gasEstimation = _c.sent();
                                                console.log("gasEstimation---------", gasEstimation);
                                                console.log("========= " + "gasEstimation of " + '\x1b[33m%s\x1b[0m', element.name + "()", " =========");
                                                transactionFee = ((gasPrice)).mul(gasEstimation);
                                                console.log('\n');
                                                console.log("transactionFee in wei: " + transactionFee.toString());
                                                console.log("transactionFee in ether: " + ethers_1.ethers.utils.formatUnits(transactionFee, "ether"));
                                                console.log('\n');
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                            });
                        });
                    });
                    return [2 /*return*/];
            }
        });
    });
}
main();
