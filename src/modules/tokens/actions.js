import _ from 'lodash';
import { coinbase, blockchain } from '../../utils/web3';
import * as helper from '../../utils/helper';
import { ADD_TOKEN, UPDATE_TOKEN } from './actionTypes'
import { flashMessage } from '../app/actions'

export function getMarketApproveToken(address) {
    return (dispatch, getState) => {
        var state = getState()
        var market = state.modules.market
        var token = _.find(state.tokens.items, {token: address})
        var type
        if (_.isEmpty(token)) {
            type = ADD_TOKEN
        } else {
            type = UPDATE_TOKEN
        }

        helper.getContract('TokenEmission', address).
            then((contract)=>{
                var value = _.toNumber(contract.allowance(coinbase(), market.address))
                dispatch({
                    type,
                    payload: {
                        token: address,
                        value
                    }
                })
            }).
            catch(function(e) {
                console.log('action getMarketApproveToken', e);
            });
    }
}

export function marketApproveToken(token, value, new_value) {
    return (dispatch, getState) => {
        var state = getState()
        var market = state.modules.market

        helper.approveToken(market.address, token, value).
            then((tx)=>{
                dispatch(flashMessage('tx: '+ tx))
                return blockchain.subscribeTx(tx)
            }).
            then(()=>{
                dispatch({
                    type: UPDATE_TOKEN,
                    payload: {
                        token,
                        value: new_value
                    }
                })
                dispatch(flashMessage('Дан доступ'))
            }).
            catch(function(e) {
                console.log('action marketApproveToken', e);
            });
    }
}
