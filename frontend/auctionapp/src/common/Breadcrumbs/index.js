import React from "react";
import "./breadcrumb.css";
import {Breadcrumb} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useBreadcrumbContext} from "../../BreadcrumbContext";
import {Icon} from "@iconify/react";

const Breadcrumbs = () => {

    const {breadcrumbTitle, breadcrumbItems} = useBreadcrumbContext();

    return breadcrumbTitle !== null ? (
        <Breadcrumb>
            <div className="breadcrumb-title">
                {breadcrumbTitle}
            </div>
            <div className="breadcrumb-right">
                {breadcrumbItems.map((item, i, {length}) => (
                    <Breadcrumb.Item active key={item.text}>
                        {length - 1 === i ? (
                            <div className="purple-text">
                            <span className="icon">
                            <Icon icon="akar-icons:arrow-right" color="#9b9b9b" width="16" height="16"/>
                            </span>
                                {item.text}
                            </div>
                        ) : (
                            <Link to={item.href}>
                                {item.text}
                            </Link>
                        )}
                    </Breadcrumb.Item>
                ))}
            </div>
        </Breadcrumb>
    ) : null;
}

export default Breadcrumbs;
