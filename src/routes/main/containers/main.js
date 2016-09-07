import _ from 'lodash'
import { connect } from 'react-redux'
import { Main } from '../components/main';

function mapStateToProps(state, props) {
    const core = state.modules.core
    const modules = []
    _.forEach(state.modules, function(item) {
        modules.push({
            name: item.name,
            url: 'app/'+ props.params.address +'/'+ item.url,
            address: item.address
        })
    })
    return {
        ...core,
        modules
    }
}

export default connect(mapStateToProps)(Main)
