//18.1.5
//18.5.3 added validation
const {Schema, model} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            required: true,
            trim: true
        },
        createdBy: {
            type: String,
            required: true,
            trim: true
        },
        createdAt:  {
            type: Date,
            default: Date.now,
            //18.2.7
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            enum: ["Personal", "Small", "Medium", "Large", "Extra Large"],
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