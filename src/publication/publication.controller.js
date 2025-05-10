import Publication from "../publication/publication.model.js";
import Category from "../category/category.model.js";

export const createDefaultPublications = async () => {
    const defaultCategories = ["Taller III", "Tecnologia III", "Practica Supervisada"];
    const defaultPublications = {
        "Taller III": [
            {
                title: "Laboratorio # 1 - Página Web",
                text: "En este proyecto personalmente fue un reto porque personalmente no sabia mucho de HTML y fue un reto para mi",
                doc: "public/uploads/docs/Laboratorio 1 - Página web.pdf",
            },
            {   title: "Laboratorio # 2 - Adición de funcionalidades",
                text: "Para este proyecto si fue un verdadero reto, ya que no comprendia mucho node.js y no estaba familiarizado", 
                doc: "public/uploads/docs/Laboratorio #2 - Adición de funcionalidades.pdf",
            },
            {   title: "Laboratorio # 3 - análisis de caso COPEREX", 
                text: "Para este proyecto me senti muy comodo y ya familiarizado con la estructura de node.js y la forma de trabajarlo",
                doc: "public/uploads/docs/Laboratorio 3 - análisis de caso COPEREX.pdf",
            },
            {   title: "Evaluación Técnica Bimestral", 
                text: "Fue un proyecto demasiado extenso pero se saco a flote con trabajo duro y dedicacion para poderlo terminar",
                doc: "public/uploads/docs/Proyecto Bimestre 1 Taller III - Venta Online.pdf",
            },
            {   title: "Proyecto Bimestral II (35%)", 
                text: "Al ser uno de los primeros proyectos siendo trabajados con la metodologia Scrum fue un poco complicado",
                doc: "public/uploads/docs/Proyecto bim II.pdf",
            },
        ],
        "Tecnologia III": [
            {   title: "Actividad # 1 - Infografía HTML, CSS, PreProcesadores", 
                text: "Fue una presentacion para introducirnos al mundo de css y html",
                doc: "public/uploads/docs/Actividad #1 - Infografía HTML, CSS, PreProcesadores.pdf",
            },
            {   title: "Actividad # 2 - Mapa conceptual", 
                text: "Fue un investigacion sobre las tecnologias que ibamos a utilizar ese bimestre",
                doc: "public/uploads/docs/Actividad #2 - Mapa conceptual.pdf",
            },
            {   title: "Actividad # 3 - Mapa mental", 
                text: "Fue un mapa mental que me llevo a entender más sobre la web y sus caracteristicas",
                doc: "public/uploads/docs/Actividad #3 - Mapa mental.pdf",
            },
            {   title: "Actividad # 4 - Infografía beneficios React", 
                text: "Fue una infografia que me sirvio para entender el entorno de react y funcionamiento",
                doc: "public/uploads/docs/Actividad #4 - Infografía beneficios React.pdf",
            },
        ],
        "Practica Supervisada": [
            {   title: "Laboratorio # 1 - Agenda Web", 
                text: "Fue un proyecto de inicio para poder acostumbrarse a un nuevo lenguaje como javascript",
                doc: "public/uploads/docs/Laboratorio 1 - Agenda Web.pdf",
            },
            {   title: "Laboratorio # 2 - Administración de alumnos", 
                text: "Fue uno de los primeros proyectos con node.js y fue dificil pero se logro culminar en su mayoria",
                doc: "public/uploads/docs/Laboratorio #2 - Gestor académico.pdf",
            },
            {   title: "Laboratorio # 3 - Gestor de opiniones", 
                text: "Fue uno de los proyecto con el que me senti mas conforme con lo entregado",
                doc: "public/uploads/docs/Laboratorio -3 - Gestor de opiniones Act.pdf",
            },
            {   title: "Laboratorio # 4 - Almacenadora", 
                text: "Fue una experiencia nueva, más en el aspecto que me toco ser Scrum Master y el proyecto fue un reto poder sacarlo a flote",
                doc: "public/uploads/docs/Laboratorio 4 - Almacenadora.pdf",
            },
        ],
    };

    try {
        for (const categoryName of defaultCategories) {
            const category = await Category.findOne({ name: categoryName });
            if (category) {
                for (const publicationData of defaultPublications[categoryName]) {
                    const existingPublication = await Publication.findOne({
                        title: publicationData.title,
                        category: category._id,
                    });

                    if (!existingPublication) {
                        const publication = new Publication({
                            ...publicationData,
                            category: category._id,
                        });
                        await publication.save();
                        console.log(`Publicación "${publication.title}" creada en la categoría "${categoryName}"`);
                    } else {
                        console.log(`La publicación "${publicationData.title}" ya existe en la categoría "${categoryName}"`);
                    }
                }
            } else {
                console.log(`La categoría "${categoryName}" no existe`);
            }
        }
    } catch (error) {
        console.error("Error al crear las publicaciones por defecto:", error);
    }
};

export const getPublicationsByCategoryName = async (req, res) => {
    const { categoryName } = req.params;

    try {
        const publications = await Publication.find()
            .select("title text doc category")
            .populate({
                path: "category",
                match: { name: categoryName },
                select: "name",
            });

        const filteredPublications = publications.filter(pub => pub.category);

        if (filteredPublications.length === 0) {
            return res.status(404).json({ message: `No se encontraron publicaciones para la categoría "${categoryName}"` });
        }

        const response = filteredPublications.map(pub => ({
            _id: pub._id,
            title: pub.title,
            text: pub.text,
            doc: pub.doc || null,
            category: pub.category.name,
        }));

        res.status(200).json(response);
    } catch (error) {
        console.error("Error al obtener las publicaciones por nombre de categoría:", error);
        res.status(500).json({ error: "Error al obtener las publicaciones por nombre de categoría" });
    }
};