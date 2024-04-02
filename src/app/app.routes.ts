import { Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { AddDocComponent } from './pages/add-doc/add-doc.component';
import { DocListComponent } from './pages/doc-list/doc-list.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        title: 'chat',
        component: ChatComponent
    },
    {
        path: "add_doc",
        component: LayoutComponent,
        children: [
            {
                path: '',
                title: "add_doc",
                component: AddDocComponent
            }
        ]
    }, {
        path: "*",
        redirectTo: '/'
    }
];
