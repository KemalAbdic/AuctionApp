import {Route, Switch} from 'react-router-dom';
import About from "../pages/About";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Register from "../pages/Register"
import Login from "../pages/Login"
import ProductPage from "../pages/ProductPage"
import LandingPage from "../pages/LandingPage";
import AllCategories from "../pages/AllCategoriesPage"
import Shop from "../pages/ShopPage"
import Profile from "../pages/ProfilePage"
import SellPage from "../pages/SellPage"


function Routes() {

    return (
        <div>
            <Switch>
                <Route exact path="/" render={props => <LandingPage {...props} />}/>
                <Route exact path="/all" render={props => <AllCategories {...props} />}/>
                <Route exact path="/about" render={props => <About {...props} />}/>
                <Route exact path="/terms" render={props => <Terms {...props} />}/>
                <Route exact path="/privacy" render={props => <Privacy {...props} />}/>
                <Route exact path="/register" render={props => <Register {...props} />}/>
                <Route exact path="/login" render={props => <Login {...props} />}/>
                <Route path="/shop/*/*/:id/" render={props => <ProductPage {...props} />}/>
                <Route path="/shop/*" render={props => <Shop {...props} />}/>
                <Route path="/profile/" render={props => <Profile {...props} />}/>
                <Route path="/seller/sell/" render={props => <SellPage {...props} />}/>
            </Switch>
        </div>
    )
}

export default Routes;
