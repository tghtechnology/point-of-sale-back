/*
  Warnings:

  - You are about to drop the column `tipo_venta` on the `articulo` table. All the data in the column will be lost.
  - The values [porcentaje,monto] on the enum `descuento_tipo_descuento` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `tipoVenta` to the `articulo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `articulo` DROP COLUMN `tipo_venta`,
    ADD COLUMN `tipoVenta` ENUM('Peso', 'Unidad') NOT NULL,
    MODIFY `estado` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `categoria` MODIFY `estado` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `descuento` MODIFY `tipo_descuento` ENUM('PORCENTAJE', 'MONTO') NOT NULL,
    MODIFY `estado` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `empleado` MODIFY `estado` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `estado` BOOLEAN NOT NULL;
