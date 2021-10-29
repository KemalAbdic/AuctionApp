import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Routes from "./routing/Routes";

function App() {
    return (
        <div>
            <Router>
                <Header/>
                <div>
                    <Routes/>
                </div>
                <div><Footer/></div>
            </Router>
        </div>
    );
}

export default App;
