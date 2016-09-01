import { startSubmit, stopSubmit, reset } from 'redux-form';
import _ from 'lodash'
import { LOAD, UPDATE_MODULE } from './actionTypes'
import { flashMessage } from '../app/actions'
import { tx, blockchain, getTransaction, coinbase } from '../../utils/web3';
import * as helper from '../../utils/helper';

export function submitFormTx(form, moduleName, func, message) {
    return (dispatch, getState) => {
        var state = getState()
        var module = state.modules[moduleName]

        dispatch(startSubmit(func));

        helper.getContract(module.type, module.address).
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
                            //dispatch(updateToken(moduleName))
                            if (message!='') {
                                dispatch(flashMessage(helper.replaceObj(message, form)))
                            }
                        });
                }
            }).
            catch(function(e) {
                console.log('action submitFormTx', e);
                dispatch(stopSubmit(func, {error: e}));
            });
    }
}

export function submitMarketAdd(form) {
    return (dispatch, getState) => {
        var state = getState()
        var market = state.modules.market;

        dispatch(startSubmit('MarketAdd'));

        helper.getContract('Market', market.address).
            then((contract)=>{
                var values = _.values(form)
                return tx(contract, 'append', [coinbase(), values[0], values[2], values[1], values[3]])
            }).
            then((tx)=>{
                dispatch(stopSubmit('MarketAdd'));
                dispatch(flashMessage('tx: '+ tx))
                dispatch(reset('MarketAdd'));
                return blockchain.subscribeTx(tx)
            }).
            then(()=>{
                //TODO: показать форму для апрува
                //lotApprove(lot, values[0], values[1])
                //dispatch(updateMarket())
                dispatch(flashMessage('Лот Добавлен'))
            }).
            catch(function(e) {
                console.log('action submitMarketAdd', e);
                dispatch(stopSubmit('MarketAdd', {error: e}));
            });
    }
}

export function marketDealLot(address) {
    return dispatch => {
        helper.getContract('Lot', address).
            then((contract)=>{
                return tx(contract, 'deal', [coinbase()])
            }).
            then((tx)=>{
                dispatch(flashMessage('tx: '+ tx))

                return blockchain.subscribeTx(tx)
            }).
            then(()=>{
                dispatch(updateMarket())
                dispatch(flashMessage('Лот куплен'))
            }).
            catch(function(e) {
                console.log('action marketDealLot', e);
            });
    }
}

export function marketRemoveLot(address) {
    return (dispatch, getState) => {
        var state = getState()
        var market = state.modules.market;

        helper.getContract('Market', market.address).
            then((contract)=>{
                return tx(contract, 'remove', [address])
            }).
            then((tx)=>{
                dispatch(flashMessage('tx: '+ tx))
                return blockchain.subscribeTx(tx)
            }).
            then(()=>{
                //dispatch(updateMarket())
                dispatch(flashMessage('Лот удален'))
            }).
            catch(function(e) {
                console.log('action marketRemoveLot', e);
            });
    }
}

export function lotApprove(lot, token, value) {
    return dispatch => {
        helper.approveToken(lot, token, value).
            then((tx)=>{
                dispatch(flashMessage('tx: '+ tx))
                return blockchain.subscribeTx(tx)
            }).
            then(()=>{
                dispatch(updateMarket())
                dispatch(flashMessage('Дан доступ'))
            }).
            catch(function(e) {
                console.log('action marketApproveToken', e);
            });
    }
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
        },
        market: {
            type: 'Market',
            url: 'market',
            name: '',
            address: '',
            owner: '',
            lots: []
        }
    }

    return dispatch => {
        var core
        helper.getContract('Core', address).
            then((contract)=>{
                core = contract
                result.core = {...result.core,
                    name: core.name(),
                    founder: core.founder(),
                    owner: core.owner(),
                    desc: core.description()
                }
                return helper.getInfoToken('shares', result.shares.type, core.getModule('DAO shares'))
            }).
            then((data)=>{
                result[data.module] = _.merge(result[data.module], data.data);
                return helper.getInfoToken('credits', result.credits.type, core.getModule('DAO credits'))
            }).
            then((data)=>{
                result[data.module] = _.merge(result[data.module], data.data);
                return helper.getInfoMarket('Market', core.getModule('DAO market'))
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
                console.log('action load', e);
            });
    }
}

export function updateToken(moduleName) {
    return (dispatch, getState) => {
        var state = getState()
        var module = state.modules[moduleName]
        helper.getInfoToken(moduleName, module.type, module.address).
            then((data)=>{
                dispatch({
                    type: UPDATE_MODULE,
                    payload: data
                })
            }).
            catch(function(e) {
                console.log('action updateToken', e);
            });
    }
}

export function updateMarket() {
    return (dispatch, getState) => {
        var state = getState()
        var module = state.modules.market
        helper.getInfoMarket(module.name, module.address).
            then((data)=>{
                dispatch({
                    type: UPDATE_MODULE,
                    payload: data
                })
            }).
            catch(function(e) {
                console.log('action updateMarket', e);
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
                        if (moduleName == 'shares' || moduleName == 'credits') {
                            dispatch(updateToken(moduleName));
                        } else if (moduleName == 'market') {
                            dispatch(updateMarket());
                        }
                    }
                })
            })
        })
    }
}
