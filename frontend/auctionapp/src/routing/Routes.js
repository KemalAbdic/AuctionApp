import {Route, Switch} from 'react-router-dom';
import About from "../pages/About";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";


function Routes() {

    return (
        <div>
            <Switch>
                <Route exact path ="/about" render={props => <About {...props} />}/>
                <Route exact path="/terms" render={props => <Terms {...props} />}/>
                <Route exact path="/privacy" render={props => <Privacy {...props} />}/>
            </Switch>
        </div>
    )
}

export default Routes;