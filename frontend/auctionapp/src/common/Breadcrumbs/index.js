import React from "react";
import "./breadcrumb.css";
import {Anchor, Breadcrumb} from "react-bootstrap";
import {withRouter} from "react-router-dom";
import {Icon} from '@iconify/react';


const Breadcrumbs = props => {
    const {history, location: {pathname}} = props;
    const pathnames = pathname.split("/").filter(x => x);
    const pages = {'about': 'About Us', 'privacy': 'Privacy and policy', 'terms': 'Terms and Conditions'};

    return (
        <Breadcrumb aria-label="breadcrumb">
            <div>{pathnames.map((name) => {
                return <span className="page-title" key={name}>{pages[name]}</span>
            })}
            </div>
            <div className="breadcrumb-right">
                {pathnames.length > 0 ? (
                    <Anchor onClick={() => history.push("/")}>Shop</Anchor>
                ) : (
                    <>Shop</>
                )}
                {pathnames.map((name, index) => {
                    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const isLast = index === pathnames.length - 1;
                    return isLast ? (
                        <span className="purple-text" key={name}>
                                <span>
                                <Icon icon="akar-icons:arrow-right" color="#9b9b9b" inline={true}/>
                                </span>
                            {pages[name]}</span>
                    ) : (
                        <Anchor key={name} onClick={() => history.push(routeTo)}>
                            {name}
                        </Anchor>
                    );
                })}
            </div>
        </Breadcrumb>
    );
};

export default withRouter(Breadcrumbs);
