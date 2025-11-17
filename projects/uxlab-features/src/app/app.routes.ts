import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "features",
        pathMatch: "full"
    },
    {
        path: "features",
        loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule)
    }
];
