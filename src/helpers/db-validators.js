import Category from "../category/category.model.js"
import Publication from "../publication/publication.model.js"
import Comment from "../comment/comment.model.js"

export const categoryExists = async (id = " ") => {
    const existe = await Category.findById(id)
    if(!existe){
        throw new Error("No existe la categoria con el ID propocionado")
    }
}

export const publicationExists = async (id = " ") => {
    const existe = await Publication.findById(id)
    if(!existe){
        throw new Error("No existe la publicacion con el ID proporcionado")
    }
}

export const commentExists = async (id = " ") => {
    const existe = await Comment.findById(id)
    if(!existe){
        throw new Error("No existe el comentario con el ID proporcionado")
    }
}