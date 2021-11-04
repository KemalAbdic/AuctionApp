import {Route, Switch} from 'react-router-dom';
import About from "../pages/About";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Register from "../pages/Register"


function Routes() {

    return (
        <div>
            <Switch>
                <Route exact path ="/about" render={props => <About {...props} />}/>
                <Route exact path="/terms" render={props => <Terms {...props} />}/>
                <Route exact path="/privacy" render={props => <Privacy {...props} />}/>
                <Route exact path="/register" render={props => <Register {...props} />}/>
            </Switch>
        </div>
    )
}

export default Routes;