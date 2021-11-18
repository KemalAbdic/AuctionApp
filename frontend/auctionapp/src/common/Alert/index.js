import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import "./alert.css";

import {alertService, AlertType} from '../../services/AlertService';

const propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

const defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({id, fade}) {
    const history = useHistory();
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {

        const subscription = alertService.onAlert(id)
            .subscribe(alert => {
                if (!alert.message) {
                    setAlerts(alerts => {
                        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);
                        filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
                        return filteredAlerts;
                    });
                } else {
                    setAlerts(alerts => ([...alerts, alert]));
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 3000);
                    }
                }
            });

        const historyUnlisten = history.listen(() => {
            alertService.clear(id);
        });

        return () => {
            subscription.unsubscribe();
            historyUnlisten();
        };
    }, []);

    function removeAlert(alert) {
        if (fade) {
            const alertWithFade = {...alert, fade: true};
            setAlerts(alerts => alerts.map(x => x === alert ? alertWithFade : x));
            setTimeout(() => {
                setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
            }, 250);
        } else {
            setAlerts(alerts => alerts.filter(x => x !== alert));
        }
    }

    function cssClasses(alert) {
        if (!alert) return;
        const classes = ['alert', 'alert-dismissible'];
        const alertTypeClass = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Warning]: 'alert alert-warning'
        }
        classes.push(alertTypeClass[alert.type]);
        if (alert.fade) {
            classes.push('fade');
        }
        return classes.join(' ');
    }

    if (!alerts.length) return null;
    return (
        <div className="alert-container">
            <div className="m-3">
                {alerts.map((alert, index) =>
                    <div key={index} className={cssClasses(alert)}>
                        <span dangerouslySetInnerHTML={{__html: alert.message}}/>
                    </div>
                )}
            </div>
        </div>
    );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export default Alert;