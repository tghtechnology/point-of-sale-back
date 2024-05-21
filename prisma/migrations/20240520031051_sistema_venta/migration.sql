/*
  Warnings:

  - You are about to alter the column `color` on the `categoria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `categoria` MODIFY `color` ENUM('Rojo', 'Verde_limon', 'Azul', 'Amarillo', 'Turquesa', 'Fucsia', 'Gris_claro', 'Gris_oscuro') NOT NULL;
