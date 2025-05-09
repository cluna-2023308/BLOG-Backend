import Category from "../category/category.model.js";

export const defaultCategories = async () => {
    const defaultCategories = ["Taller III", "Tecnologia III", "Practica Supervisada"];

    try {
        for (const name of defaultCategories) {
            const existingCategory = await Category.findOne({ name });
            if (!existingCategory) {
                const category = new Category({ name });
                await category.save();
                console.log(`Las categorias por defecto ${name} han sido creadas`);
            } else {
                console.log(`La categoría ${name} mencionadas ya existen`);
            }
        }
    } catch (error) {
        console.error('Error al crear las categorías por defecto:', error);
    }
};

export default defaultCategories;