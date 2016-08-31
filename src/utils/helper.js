import _ from 'lodash'
import { getContract as web3Contract, loadAbiByName, tx, coinbase } from './web3';

export function replaceArray(string, find, replace) {
    var regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], 'g');
        string = string.replace(regex, replace[i]);
    }
    return string;
}

export function replaceObj(string, obj) {
    var find = [];
    var replace = [];
    _.forEach(obj, function(value, key) {
        find.push('%'+ key +'%')
        replace.push(value)
    });
    return replaceArray(string, find, replace);
}

export function getContract(name, address) {
    return loadAbiByName(name).
        then((abi)=>{
            return web3Contract(abi, address)
        })
}

export function approveToken(target, token, value) {
    return getContract('TokenEmission', token).
        then((contract)=>{
            return tx(contract, 'approve', [target, value])
        })
}

export function getInfoToken(name, type, address) {
    return getContract(type, address).
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
                    balance: (contract.getBalance({from:coinbase()}) / decimals) + symbol
                }
            }
        })
}

export function getInfoMarket(name, address) {
    var market, tokenAbi;
    return getContract('Market', address).
        then((contract)=>{
            market = contract
            return loadAbiByName('TokenEmission')
        }).
        then((abi)=>{
            tokenAbi = abi
            return loadAbiByName('Lot')
        }).
        then((abi)=>{
            var lots = []
            for (var addr = market.first(); addr != 0; addr = market.next(addr)) {
                var lot = web3Contract(abi, addr)
                if (!lot.closed()) {
                    var sale = lot.sale()
                    var buy = lot.buy()
                    var tokenSale = web3Contract(tokenAbi, sale)
                    var tokenBuy = web3Contract(tokenAbi, buy)
					try {
						lots.push({
							address: addr,
							seller: lot.seller(),
							buyer: lot.buyer(),
							sale_address: sale,
							buy_address: buy,
							sale_name: tokenSale.name(),
							buy_name: tokenBuy.name(),
							sale_quantity: _.toNumber(lot.quantity_sale()),
							buy_quantity: _.toNumber(lot.quantity_buy()),
							//approve_quantity: _.toNumber(tokenBuy.getBalance(coinbase(), {from: address})),
							approve_quantity: _.toNumber(tokenBuy.allowance(coinbase(), address)),
							my: (lot.seller() == coinbase()) ? true : false
						})
					} catch (e) {
						console.log('load lot err token info', e);
					}

                    /*lots.push({
                        address: addr,
                        seller: lot.seller(),
                        buyer: lot.buyer(),
                        sale_address: sale,
                        buy_address: buy,
                        sale_name: tokenSale.name(),
                        buy_name: tokenBuy.name(),
                        //sale_quantity: _.toNumber(lot.quantity_sale()),
                        //buy_quantity: _.toNumber(lot.quantity_buy()),
                        sale_quantity: 1,
                        buy_quantity: 1,
                        //approve_quantity: _.toNumber(tokenBuy.getBalance(coinbase(), {from: address})),
                        //approve_quantity: _.toNumber(tokenBuy.allowance(coinbase(), address)),
                        approve_quantity: 0,
                        my: (lot.seller() == coinbase()) ? true : false
                    })*/
                }
            }
            return {
                module: 'market',
                data: {
                    name: name,
                    address: address,
                    owner: market.owner(),
                    lots: lots
                }
            }
        })
}
