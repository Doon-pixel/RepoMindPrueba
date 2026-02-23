import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PeticionesService } from '../servicios/peticiones.service';


export const atutenticacionRolGuard: CanActivateFn = async (route, state) => {

  const peticion = inject(PeticionesService);
  const router = inject(Router);

  const post = {
    host: peticion.HostLocal,
    path: "/api/usuarios/Status"
  };

  try {
    // Esperamos la respuesta de la promesa
    const respuesta: any = await peticion.Get(post.host + post.path);

    console.log(respuesta.rol);

    if (respuesta.rol === 'Administrador') {
      return true; // permite la ruta
    } else {
      router.navigate(['/login']); // redirige si no tiene permiso
      return false;
    }

  } catch (error) {
    console.error(error);
    router.navigate(['/login']); // redirige en caso de error
    return false;
  }
};
