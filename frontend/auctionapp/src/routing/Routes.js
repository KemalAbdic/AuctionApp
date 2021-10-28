import {Route, Switch} from 'react-router-dom';
import About from "../pages/About";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";


function Routes() {

    return (
        <div>
            <Switch>
                <Route path="/about" component={About}/>
                <Route path="/terms" component={Terms}/>
                <Route path="/privacy" component={Privacy}/>
            </Switch>
        </div>
    )
}

export default Routes;