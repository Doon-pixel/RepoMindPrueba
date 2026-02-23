import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { MisionComponent } from './componentes/mision/mision.component';
import { VisionComponent } from './componentes/vision/vision.component';
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { CitasComponent } from './componentes/citas/citas.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { ServiciosComponent } from './componentes/servicios/servicios.component';
import { PatologiasComponent } from './componentes/patologias/patologias.component';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { ProductsComponent } from './componentes/products/products.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ServicesComponent } from './componentes/services/services.component';
import { MarcasComponent } from './componentes/marcas/marcas.component';
import { RolesComponent } from './componentes/roles/roles.component';
import { PermisosComponent } from './componentes/permisos/permisos.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { atutenticacionRolGuard } from './guards/atutenticacion-rol.guard';
import { CambiarPasswordComponent } from './componentes/cambiar-password/cambiar-password.component';
import { RegisterComponent } from './componentes/register/register.component';
import { ActivarComponent } from './componentes/activar/activar.component';

export const routes: Routes = [
    {path:'', component:HomeComponent, pathMatch:'full'},
    {path:'mision',component:MisionComponent,pathMatch:'full'},
    {path:'vision',component:VisionComponent,pathMatch:'full'},
    {path:'contactenos',component:ContactenosComponent,pathMatch:'full'},
    {path:'login',component:LoginComponent,pathMatch:'full'},
    {path:'login/:email',component:LoginComponent,pathMatch:'full'},
    {path:'registro', component:RegistroComponent,pathMatch:'full'},
    {path:'home', component:HomeComponent,pathMatch:'full'},
    {path:'citas', component:CitasComponent,pathMatch:'full'},
    {path:'productos', component:ProductosComponent,pathMatch:'full'},
    {path:'servicios', component:ServiciosComponent,pathMatch:'full'},
    {path:'register', component:RegisterComponent,pathMatch:'full'},
    {path:'patologias', component:PatologiasComponent,pathMatch:'full'},
    {path:'dashboard', component:DashboardComponent,pathMatch:'full'},
    {path:'activar/:email/:codigo', component:ActivarComponent,pathMatch:'full'},
    {path:'cambiarPassword', component:CambiarPasswordComponent,pathMatch:'full'},
    {path:'products', component:ProductsComponent,pathMatch:'full',canActivate:[atutenticacionRolGuard]},
    {path:'usuarios', component:UsuariosComponent,pathMatch:'full',canActivate:[atutenticacionRolGuard]},
    {path:'services',component:ServicesComponent, pathMatch:'full',canActivate:[atutenticacionRolGuard]},
    {path:'marcas',component:MarcasComponent, pathMatch:'full',canActivate:[atutenticacionRolGuard]},
    {path:'roles',component:RolesComponent, pathMatch:'full',canActivate:[atutenticacionRolGuard]},
    {path:'permisos',component:PermisosComponent,pathMatch:'full',canActivate:[atutenticacionRolGuard]},
    {path:'detalle/:nombre/:id',component:DetalleComponent,pathMatch:'full',canActivate:[atutenticacionRolGuard]},
    

];
