import {Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

const alertSubject = new Subject();
const defaultId = 'default-alert';

export const alertService = {
    onAlert,
    success,
    error,
    warning,
    alert,
    clear
};

export const AlertType = {
    Success: 'Success',
    Error: 'Error',
    Warning: 'Warning'
}

function onAlert(id = defaultId) {
    return alertSubject.asObservable().pipe(filter(x => x && x.id === id));
}

function success(message, options) {
    alert({...options, type: AlertType.Success, message});
}

function error(message, options) {
    alert({...options, type: AlertType.Error, message});
}

function warning(message, options) {
    alert({...options, type: AlertType.Warning, message});
}

function alert(alert) {
    alert.id = alert.id || defaultId;
    alertSubject.next(alert);
}

function clear(id = defaultId) {
    alertSubject.next({id});
}