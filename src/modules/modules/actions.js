import { startSubmit, stopSubmit, reset } from 'redux-form';
import _ from 'lodash'
import { LOAD, UPDATE_MODULE } from './actionTypes'
import { flashMessage } from '../app/actions'
import { getContract, loadAbiByName, tx, blockchain, getTransaction } from '../../utils/web3';

function replaceArray(string, find, replace) {
    var regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], 'g');
        string = string.replace(regex, replace[i]);
    }
    return string;
}

function replaceObj(string, obj) {
    var find = [];
    var replace = [];
    _.forEach(obj, function(value, key) {
        find.push('%'+ key +'%')
        replace.push(value)
    });
    return replaceArray(string, find, replace);
}

export function submitFormTx(form, moduleName, func, message) {
    return (dispatch, getState) => {
        var state = getState()
        var module = state.modules[moduleName]

        dispatch(startSubmit(func));

        loadAbiByName(module.type).
            then((abi)=>{
                return getContract(abi, module.address)
            }).
            then((contract)=>{
                return tx(contract, func, _.values(form))
            }).
            then((tx)=>{
                dispatch(stopSubmit(func));
                dispatch(flashMessage('tx: '+ tx))
                dispatch(reset(func));

                if (moduleName == 'shares' || moduleName == 'credits') {
                    blockchain.subscribeTx(tx).
                        then(()=>{
                            dispatch(updateToken(moduleName))
                            if (message!='') {
                                dispatch(flashMessage(replaceObj(message, form)))
                            }
                        });
                }
            }).
            catch(function(e) {
                console.log('ERR', e);
                dispatch(stopSubmit(func, {error: e}));
            });
    }
}

function getInfoToken(name, type, address) {
    return loadAbiByName(type).
        then((abi)=>{
            return getContract(abi, address)
        }).
        then((contract)=>{
            const decimals = Math.pow(10, contract.decimals())
            const symbol = contract.symbol()
            return {
                module: name,
                data: {
                    name: contract.name(),
                    address: address,
                    owner: contract.owner(),
                    decimals: contract.decimals().toString(),
                    symbol: symbol,
                    total_supply: (contract.totalSupply() / decimals) + symbol,
                    balance: (contract.getBalance() / decimals) + symbol
                }
            }
        }).
        catch(function(e) {
            console.log('LOAD CORE ABI', e);
        });
}

export function load(address) {
    var result = {
        core: {
            type: 'Core',
            url: 'core',
            name: '',
            address: address,
            founder: '',
            owner: '',
            desc: ''
        },
        shares: {
            type: 'TokenEmission',
            url: 'token/shares',
            name: '',
            address: '',
            owner: '',
            decimals: '',
            symbol: '',
            total_supply: '',
            balance: ''
        },
        credits: {
            type: 'TokenEmission',
            url: 'token/credits',
            name: '',
            address: '',
            owner: '',
            decimals: '',
            symbol: '',
            total_supply: '',
            balance: ''
        }
    }

    return dispatch => {
        var core
        loadAbiByName('Core').
            then((abi)=>{
                return getContract(abi, address)
            }).
            then((contract)=>{
                core = contract
                result.core = {...result.core,
                    name: core.name(),
                    founder: core.founder(),
                    owner: core.owner(),
                    desc: core.description()
                }
                return getInfoToken('shares', result.shares.type, core.getModule('DAO shares'))
            }).
            then((data)=>{
                result[data.module] = _.merge(result[data.module], data.data);
                return getInfoToken('credits', result.credits.type, core.getModule('DAO credits'))
            }).
            then((data)=>{
                result[data.module] = _.merge(result[data.module], data.data);
            }).
            then(()=>{
                dispatch({
                    type: LOAD,
                    payload: result
                })
            }).
            catch(function(e) {
                console.log('LOAD CORE ABI', e);
            });
    }
}

export function updateToken(moduleName) {
    return (dispatch, getState) => {
        var state = getState()
        var module = state.modules[moduleName]
        getInfoToken(moduleName, module.type, module.address).
            then((data)=>{
                dispatch({
                    type: UPDATE_MODULE,
                    payload: data
                })
            }).
            catch(function(e) {
                console.log('LOAD CORE ABI', e);
            });
    }
}

export function observeModules() {
    return (dispatch, getState) => {
        blockchain.setSubscribe((block)=>{
            _.forEach(block.transactions, function(tx) {
                var info = getTransaction(tx);
                var state = getState()
                _.forEach(state.modules, function(module, moduleName) {
                    if (module.address == info.from || module.address == info.to) {
                        dispatch(updateToken(moduleName));
                    }
                })
            })
        })
    }
}
