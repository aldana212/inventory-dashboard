import * as Icons from "lucide-react";

// export const techIcons = ["Laptop", "Smartphone", "Cpu", "Tv", "Monitor"];

// export const fashionIcons = ["Shirt", "Shopping-bag", "Watch", "Glasses"];

// export const foodIcons = ["Utensils", "Coffee", "Pizza", "Apple"];

// export const homeIcons = ["Home", "Sofa", "Lamp", "Bed"];

// export const toolsIcons = ["Wrench", "Hammer", "Screwdriver", "Drill"];

// Generales
const generalIcons = [
  "Folder",
  "FolderTree",
  "Layers",
  "Grid",
  "List",
  "LayoutGrid",
  "Boxes",
];

// 🔧 Herramientas / construcción
const toolsIcons = ["Wrench", "Hammer", "HardHat", "Drill", "Cog"];

// 💻 Tecnología / electrónica
const techIcons = ["Laptop", "Monitor", "Smartphone", "Cpu", "HardDrive"];

// 👕 Ropa / moda
const clothingIcons = ["Shirt", "ShoppingBag", "Footprints", "Watch"];

// 🏠 Hogar / muebles
const homeIcons = ["Sofa", "Lamp", "Bed", "Home", "Armchair"];

// 🍽️ Cocina / alimentos
const kitchenIcons = ["Utensils", "ChefHat", "Coffee", "Refrigerator", "Apple"];

// 🏋️ Deportes / fitness
const sportsIcons = ["Dumbbell", "Bike", "Trophy", "Medal", "Gamepad2"];

// 🚗 Automotriz
const automotiveIcons = ["Car", "Truck", "Fuel", "Gauge", "Settings"];

// 📦 Oficina / papelería
const officeIcons = ["Printer", "Clipboard", "Pen", "Notebook", "FileText"];

// 🧸 Juguetes / niños
const toysIcons = ["ToyBrick", "Puzzle", "Gamepad", "Baby"];

// 🐶 Mascotas
const petsIcons = ["Dog", "Cat", "Fish", "Bone"];

export const categoryIcons = [
  "All",
  ...generalIcons,
  ...toolsIcons,
  ...techIcons,
  ...clothingIcons,
  ...homeIcons,
  ...kitchenIcons,
  ...sportsIcons,
  ...automotiveIcons,
  ...officeIcons,
  ...toysIcons,
  ...petsIcons,
];

export const getIcon = (name, color = "#64748B") => {
  const Icon = Icons[name];
  return Icon ? <Icon size={18} color={color} /> : null;
};
