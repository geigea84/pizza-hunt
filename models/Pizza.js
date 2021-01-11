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
PizzaSchema.virtual("commentCount").get(function() {
    return this.comments.length;
})

//create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

//export the Pizza model
module.exports = Pizza;