/*
  Warnings:

  - You are about to alter the column `estado` on the `articulo` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Bit(1)`.
  - You are about to alter the column `estado` on the `categoria` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Bit(1)`.
  - You are about to alter the column `estado` on the `descuento` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Bit(1)`.
  - You are about to alter the column `estado` on the `empleado` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Bit(1)`.
  - You are about to alter the column `estado` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Bit(1)`.

*/
-- AlterTable
ALTER TABLE `articulo` MODIFY `estado` BIT(1) NOT NULL;

-- AlterTable
ALTER TABLE `categoria` MODIFY `estado` BIT(1) NOT NULL;

-- AlterTable
ALTER TABLE `descuento` MODIFY `estado` BIT(1) NOT NULL;

-- AlterTable
ALTER TABLE `empleado` MODIFY `estado` BIT(1) NOT NULL;

-- AlterTable
ALTER TABLE `usuario` MODIFY `estado` BIT(1) NOT NULL;
