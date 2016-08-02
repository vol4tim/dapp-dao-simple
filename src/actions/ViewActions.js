import { LOAD, REQUEST } from '../constants/View'
import { getContract, loadAbiByName } from '../utils/dao_factory'

export function load(address) {
    return dispatch => {
        dispatch({
            type: REQUEST
        })

        loadAbiByName('Core').
            then((abi)=>{
                var dao = getContract(abi.data, address);
                var modules = []
                for (var addr = dao.firstModule(); addr != 0; addr = dao.nextModule(addr)) {
                    modules.push({
                        name: dao.getModuleName(addr),
                        address: addr
                    })
                }
                dispatch({
                    type: LOAD,
                    payload: {
                        name: dao.name(),
                        modules: modules
                    }
                })
            }).
            catch(function(e) {
                console.log('ERR', e);
                dispatch({
                    type: LOAD,
                    payload: {
                        name: 'DAO не найден',
                        modules: []
                    }
                })
            });
    }
}
