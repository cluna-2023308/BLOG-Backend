import Publication from "../publication/publication.model.js";
import Category from "../category/category.model.js";
import path from "path";
import { fileURLToPath } from 'url';
import { fileTypeFromBuffer } from 'file-type';
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const createDefaultPublications = async () => {
    const defaultCategories = ["Taller III", "Tecnologia III", "Practica Supervisada"];
    const defaultPublications = {
        "Taller III": [
            {
                title: "Laboratorio # 1 - Página Web",
                text: "En este proyecto personalmente fue un reto porque personalmente no sabia mucho de HTML y fue un reto para mi",
                date: "2025-01-26T00:00:00Z",
                image: "public/uploads/images/lab1-taller.png",
                docPath: "public/uploads/docs/Laboratorio1-Páginaweb.pdf",
            },
            {   title: "Laboratorio # 2 - Adición de funcionalidades",
                text: "Para este proyecto si fue un verdadero reto, ya que no comprendia mucho node.js y no estaba familiarizado", 
                date: "2025-02-03T00:00:00Z",
                image: "public/uploads/images/lab2-taller.png",
                docPath: "public/uploads/docs/Laboratorio2-Adicióndefuncionalidades.pdf",
            },
            {   title: "Laboratorio # 3 - análisis de caso COPEREX", 
                text: "Para este proyecto me senti muy comodo y ya familiarizado con la estructura de node.js y la forma de trabajarlo",
                date: "2025-02-28T00:00:00Z",
                image: "public/uploads/images/lab3-taller.png",
                docPath: "public/uploads/docs/Laboratorio3-AnalisisdecasoCOPEREX.pdf",
            },
            {   title: "Evaluación Técnica Bimestral", 
                text: "Fue un proyecto demasiado extenso pero se saco a flote con trabajo duro y dedicacion para poderlo terminar",
                date: "2025-03-05T00:00:00Z",
                image: "public/uploads/images/final-bim1-taller.png",
                docPath: "public/uploads/docs/ProyectoBimestre1TallerIII-VentaOnline.pdf",
            },
            {   title: "Proyecto Bimestral II (35%)", 
                text: "Al ser uno de los primeros proyectos siendo trabajados con la metodologia Scrum fue un poco complicado",
                date: "2025-05-04T00:00:00Z",
                image: "public/uploads/images/final-bim2-taller.jpeg",
                docPath: "public/uploads/docs/ProyectobimII.pdf",
            },
        ],
        "Tecnologia III": [
            {   title: "Actividad # 1 - Infografía HTML, CSS, PreProcesadores", 
                text: "Fue una presentacion para introducirnos al mundo de css y html",
                date: "2025-01-23T00:00:00Z",
                image: "public/uploads/images/lab1-tec.png",
                docPath: "public/uploads/docs/Actividad1-InfografíaHTML,CSS,PreProcesadores.pdf",
            },
            {   title: "Actividad # 2 - Mapa conceptual", 
                text: "Fue un investigacion sobre las tecnologias que ibamos a utilizar ese bimestre",
                date: "2025-02-02T00:00:00Z",
                image: "public/uploads/images/lab2-tec.png",
                docPath: "public/uploads/docs/Actividad2-Mapaconceptual.pdf",
            },
            {   title: "Actividad # 3 - Mapa mental", 
                text: "Fue un mapa mental que me llevo a entender más sobre la web y sus caracteristicas",
                date: "2025-02-16T00:00:00Z",
                image: "public/uploads/images/lab3-tec.png",
                docPath: "public/uploads/docs/Actividad3-Mapamental.pdf",
            },
            {   title: "Actividad # 4 - Infografía beneficios React", 
                text: "Fue una infografia que me sirvio para entender el entorno de react y funcionamiento",
                date: "2025-03-29T00:00:00Z",
                image: "public/uploads/images/lab4-tec.png",
                docPath: "public/uploads/docs/Actividad4-InfografiabenefiosReact.pdf",
            },
        ],
        "Practica Supervisada": [
            {   title: "Laboratorio # 1 - Agenda Web", 
                text: "Fue un proyecto de inicio para poder acostumbrarse a un nuevo lenguaje como javascript",
                date: "2025-01-26T00:00:00Z",
                image: "public/uploads/images/lab1-practica.png",
                docPath: "public/uploads/docs/Laboratorio1-AgendaWeb.pdf",
            },
            {   title: "Laboratorio # 2 - Administración de alumnos", 
                text: "Fue uno de los primeros proyectos con node.js y fue dificil pero se logro culminar en su mayoria",
                date: "2025-02-09T00:00:00Z",
                image: "public/uploads/images/lab2-practica.png",
                docPath: "public/uploads/docs/Laboratorio2-Gestoracadémico.pdf",
            },
            {   title: "Laboratorio # 3 - Gestor de opiniones", 
                text: "Fue uno de los proyecto con el que me senti mas conforme con lo entregado",
                date: "2025-02-21T00:00:00Z",
                image: "public/uploads/images/lab3-practica.png",
                docPath: "public/uploads/docs/Laboratorio3-GestordeopinionesAct.pdf",
            },
            {   title: "Laboratorio # 4 - Almacenadora", 
                text: "Fue una experiencia nueva, más en el aspecto que me toco ser Scrum Master y el proyecto fue un reto poder sacarlo a flote",
                date: "2025-05-04T00:00:00Z",
                image: "public/uploads/images/lab4-practica.jpeg",
                docPath: "public/uploads/docs/Laboratorio4-Almacenadora.pdf",
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
                        // Leer el PDF
                        const pdfPath = path.resolve(publicationData.docPath);
                        const pdfBuffer = fs.existsSync(pdfPath) ? fs.readFileSync(pdfPath) : null;

                        // Leer la imagen y guardarla como buffer
                        let imageBuffer = null;
                        if (publicationData.image) {
                            const imagePath = path.resolve(publicationData.image);
                            imageBuffer = fs.existsSync(imagePath) ? fs.readFileSync(imagePath) : null;
                        }

                        const publication = new Publication({
                            title: publicationData.title,
                            text: publicationData.text,
                            date: publicationData.date,
                            image: imageBuffer, // Guarda la imagen como buffer
                            doc: pdfBuffer,
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
            .populate({
                path: "category",
                match: { name: categoryName },
                select: "name",
            });

        const filteredPublications = publications.filter((pub) => pub.category);

        if (filteredPublications.length === 0) {
            return res.status(404).json({ message: `No se encontraron publicaciones para la categoría "${categoryName}"` });
        }

        res.status(200).json(
            filteredPublications.map((pub) => ({
                _id: pub._id,
                title: pub.title,
                text: pub.text,
                image: pub.image,
                doc: pub.doc ? pub.doc.toString("base64") : null, // Devuelve el contenido del PDF como Base64
                category: pub.category,
                comments: pub.comments,
                date: pub.date,
            }))
        );
    } catch (error) {
        console.error("Error al obtener las publicaciones por nombre de categoría:", error);
        res.status(500).json({
            error: "Error al obtener las publicaciones por nombre de categoría",
            message: error.message,
        });
    }
};

// Este metodo su unico fin era poder observar que los pdf se esten guardando de manera correcta
export const getPDFByPublicationId = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: `No se encontró la publicación con el ID "${id}"`,
            });
        }

        if (!publication.doc) {
            return res.status(404).json({
                success: false,
                message: `La publicación con ID "${id}" no tiene un archivo PDF asociado`,
            });
        }

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `inline; filename="${publication.title}.pdf"`,
        });

        res.send(publication.doc);
    } catch (error) {
        console.error("Error al obtener el PDF de la publicación:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener el PDF de la publicación",
            error: error.message,
        });
    }
};

export const getPublicationById = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publication.findById(id)
            .populate("category", "name")
            .populate("comments", "user text date");

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: `No se encontró la publicación con el ID "${id}"`,
            });
        }

        res.status(200).json({
            success: true,
            publication: {
                _id: publication._id,
                title: publication.title,
                text: publication.text,
                doc: publication.doc ? publication.doc.toString("base64") : null,
                category: publication.category,
                comments: publication.comments,
                date: publication.date, // Devuelve la fecha manual
            },
        });
    } catch (error) {
        console.error("Error al obtener la publicación por ID:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener la publicación por ID",
            error: error.message,
        });
    }
};

export const getPublicationsByCategoryNew = async (req, res) => {
    const { categoryName } = req.params;

    try {
        const publications = await Publication.find()
            .populate({
                path: "category",
                match: { name: categoryName },
                select: "name",
            })
            .sort({ date: -1 });

        const filteredPublications = publications.filter((pub) => pub.category);

        if (filteredPublications.length === 0) {
            return res.status(404).json({ message: `No se encontraron publicaciones para la categoría "${categoryName}"` });
        }

        res.status(200).json(
            filteredPublications.map((pub) => ({
                _id: pub._id,
                title: pub.title,
                text: pub.text,
                doc: pub.doc ? pub.doc.toString("base64") : null,
                category: pub.category,
                comments: pub.comments,
                date: pub.date,
            }))
        );
    } catch (error) {
        console.error("Error al obtener las publicaciones por nombre de categoría ordenadas:", error);
        res.status(500).json({
            error: "Error al obtener las publicaciones por nombre de categoría ordenadas", 
            message: error.message,
        });
    }
};

export const getImageByPublicationId = async (req, res) => {
    const { id } = req.params;

    try {
        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({
                success: false,
                message: `No se encontró la publicación con el ID "${id}"`,
            });
        }

        if (!publication.image) {
            return res.status(404).json({
                success: false,
                message: `La publicación con ID "${id}" no tiene una imagen asociada`,
            });
        }

        const imageBuffer = Buffer.isBuffer(publication.image)
            ? publication.image
            : Buffer.from(publication.image, "base64");

        const type = await fileTypeFromBuffer(imageBuffer);
        const mimeType = type?.mime || "image/png";

        const base64Image = imageBuffer.toString("base64");

        res.status(200).json({
            success: true,
            image: `data:${mimeType};base64,${base64Image}`,
        });
    } catch (error) {
        console.error("Error al obtener la imagen de la publicación:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener la imagen de la publicación",
            error: error.message,
        });
    }
};
