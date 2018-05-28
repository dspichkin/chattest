import { Observable, Observer, of } from 'rxjs';

export class AppSettings {
    static host = document.location.hostname;
    static protocol = document.location.protocol;
    
    public static BASE_URL;
    
    public static URL_STATUS;
    public static URL_WEBSOKET;
    public static URL_FILE;
    public static URL_LOG;

    static initialized() {
        if (AppSettings.host.indexOf('localhost') > -1 || AppSettings.host.indexOf('127.0.0.1') > -1) {
            AppSettings.BASE_URL = AppSettings.protocol + '//' + AppSettings.host + ':8000';
            AppSettings.URL_WEBSOKET = 'ws://' + document.location.hostname + ':8000/chat/';
        } else {
            AppSettings.BASE_URL = AppSettings.protocol + '//' + AppSettings.host;
            AppSettings.URL_WEBSOKET = 'ws://' + document.location.hostname + '/chat/';
        }
        AppSettings.URL_FILE = AppSettings.BASE_URL + '/file-upload/';
        AppSettings.URL_LOG = AppSettings.BASE_URL + '/log/';

        return of().toPromise();
    }


}