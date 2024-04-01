-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `rol` ENUM('Propietario', 'Empleado') NOT NULL DEFAULT 'Empleado';
