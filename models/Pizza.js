//18.1.5
const {Schema, model} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String
        },
        createdBy: {
            type: String
        },
        createdAt:  {
            type: Date,
            default: Date.now,
            //18.2.7
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            default: "Large"
        },
        toppings: [],
        //18.2.4
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            //18.2.7
            getters: true
        },
        id: false
    }
);

//18.2.4 get total count of comments and replies on retrieval
//18.3.4 udpated
PizzaSchema.virtual("commentCount").get(function() {
    return this.comments.reduce((total, comment) => total + comment.replies.length +1, 0);
})

//create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

//export the Pizza model
module.exports = Pizza;