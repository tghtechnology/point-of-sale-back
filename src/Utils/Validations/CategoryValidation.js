import { z } from 'zod';

//Validación para crear categoría
export const createCategorySchema = z.object({
  nombre: z.string().min(1, 'El campo nombre no puede estar vacío'),
  color: z.string().min(1, 'El campo color no puede estar vacío'),
});

//Validación
export const idSchema = z.object({
    id: z
      .string()
      .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
        message: 'El ID debe ser un número entero positivo',
      }),
  });

export const editCategorySchema = z.object({
    id: z
      .string()
      .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) > 0, {
        message: 'El ID debe ser un número entero positivo',
      }),
    nombre: z.string().min(1, 'El campo nombre no puede estar vacío'),
    color: z.string().min(1, 'El campo color no puede estar vacío'),
})