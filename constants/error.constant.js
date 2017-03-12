module.exports = Object.freeze({

    OFFER: {
        DESCRIPTION_MISSING: {
            code: "Offer/missing description",
            message: "Description is required"
        },

        USERNAME_MISSING: {
            code: "Offer/missing username",
            message: "Username is required"
        },

        ORDERID_MISSING: {
            code: "Offer/missing order id",
            message: "Order Id is required"
        },

        INVALID_PRICE: {
            code: "Offer/invalid price",
            message: "Price is required and cannot be less than zero"
        },

        ORDER_DOESNOT_EXIST: {
            code: "Offer/order does not exist",
            message: "The order you provided does not exist"
        },

        OFFERID_MISSING: {
            code: "Offer/missing offer id",
            message: "Offer id is required"
        },

        OFFER_ALREADY_ACCEPTED: {
            code: "Offer/already accepted",
            message: "The selected offer was previously accepted"
        },

        OFFER_CLOSED: {
            code: "Offer/offer closed",
            message: "The selected offer is closed."
        },

        INVALID_RATING: {
            code: "Offer/invalid rating",
            message: "Rating can only be between {0,5} and you can only rate delivered offers"
        },

        INVALID_DELIVERY:{
            code: "Offer/invalid delivery",
            message: "Cannot submit unaccepted offers for delivery"
        }
    },
    ORDER: {
        DESCRIPTION_MISSING: {
            code: "Order/missing description",
            message: "Description is required"
        },

        TITLE_MISSING: {
            code: "Order/missing title",
            message: "Title is required"
        },

        USERNAME_MISSING: {
            code: "Order/missing username",
            message: "Username is required"
        },

        ORDERID_MISSING: {
            code: "Order/missing order id",
            message: "Order Id is required"
        },

        INVALID_CATEGORY: {
            code: "Order/invalid category",
            message: "Invalid Category"
        }
    },
    AUTH: {
        USERNAME_MISSING: {
            code: "Auth/username missing",
            message: "Username is required"
        },

        PASSWORD_MISSING: {
            code: "Auth/password missing",
            message: "Password is required"
        },
        EMAIL_MISSING: {
            code: "Auth/email missing",
            message: "Email is required"
        },

        ADDRESS_MISSING: {
            code: "Auth/address missing",
            message: "Address is required"
        },

        PHONE_MISSING: {
            code: "Auth/phone missing",
            message: "Phone is required"
        },

        NAME_MISSING: {
            code: "Auth/name missing",
            message: "Name is required"
        },

        INVALID_ROLE: {
            code: "Auth/invalid role",
            message: "Invalid role"
        },

        NATIONALID_MISSING: {
            code: "Auth/national ID missing",
            message: "National Id is required for providers"
        },

        NOT_AUTHERIZED: {
            code:"Auth/not autherized",
            message:"You are not autherized access this information"
        }
    },
    UNKOWN: {
        code: "UNKOWN ERROR",
        message: "Something wrong happened"
    }
});