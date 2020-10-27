import { InjectionToken } from '@angular/core';

export const LOCAL_STORAGE_TOKEN: InjectionToken<Storage> = new InjectionToken(
    'Local Storage Token',
    {
        providedIn: 'root',
        factory: () => (localStorage) as Storage,
    },
);