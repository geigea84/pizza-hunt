//18.2.6
//18.3.5 updated
const router = require("express").Router();
const {
    addComment, 
    removeComment,
    addReply,
    removeReply
} = require("../../controllers/comment-controller");

// /api/comments/<pizzaId>
router.route("/:pizzaId").post(addComment);

// /api/comments/<pizzaId>/<commentId>
//18.3.5 udpated
router
.route("/:pizzaId/:commentId").delete(removeComment)
.put(addReply)
.delete(removeComment)

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);


module.exports = router;