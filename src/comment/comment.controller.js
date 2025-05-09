import Comment from "../comment/comment.model.js"
import Publication from "../publication/publication.model.js"

export const createComment = async (req, res) => {
    try{
        const { text, publicationId } = req.body;

        const publicationExists = await Publication.findById(publicationId);
        if (!publicationExists) {
            return res.status(404).json({
                success: false,
                message: "Publicacion no encontrada"
            });
        }

        const comment = new Comment({text, publication: publicationId});
        const saveComment = await comment.save();

        await Publication.findByIdAndUpdate(
            publicationId,
            { $push: { comments: saveComment._id } }, 
            { new: true }
        );

        return res.status(201).json({
            success: true,
            msg: `Comentario creado exitosamente`,
            comment: saveComment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Error al crear el comentario",
            error: error.message
        });
    }
}

export const updateComment = async (req, res) => {
    try{
        const { id } = req.params;
        const { text, publication } = req.body;

        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comentario no encontrado"
            });
        }

        if (publication) {
            const publicationExists = await Publication.findById(publication);
            if (!publicationExists) {
                return res.status(404).json({
                    success: false,
                    message: "Publicacion no encontrada"
                });
            }
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, { text, publication }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Comentario actualizado exitosamente",
            comment: updatedComment
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el comentario",
            error: error.message
        });
    }
}

export const deleteComment = async (req, res) => {
    try{
        const { id } = req.params;
    
            const commentDelete = await Comment.findByIdAndUpdate(id, { status: false }, { new: true });

            return res.status(200).json({
                success: true,
                message: "Comentario eliminado",
                commentDelete,
            });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el comentario",
            error: err.message,
        });
    }
};