import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Routes from "./routing/Routes";
import Breadcrumbs from "./common/Breadcrumbs";
import Alert from "./common/Alert"

function App() {
    return (
        <div>
            <Router>
                <Header/>
                <Breadcrumbs/>
                <Alert/>
                <div>
                    <Routes/>
                </div>
                <div><Footer/></div>
            </Router>
        </div>
    );
}

export default App;
