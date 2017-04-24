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

        OFFER_DOESNOT_EXIST: {
            code: "Offer/offer does not exist",
            message: "The offer you provided does not exist"
        },

        OFFERID_MISSING: {
            code: "Offer/missing offer id",
            message: "Offer id is required"
        },

        CATEGORY_REQUIRED: {
            code: "Offer/missing or invalid category",
            message: "Category is missing or invalid"
        },

        DUPLICATE_OFFER: {
            code: "Offer/duplicate offer",
            message: "Cannot make two offers for the same order"
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

        INVALID_DELIVERY: {
            code: "Offer/invalid delivery",
            message: "Cannot submit unaccepted offers for delivery"
        },
        INVALID_PAYMENT_INFO: {
            code: "Offer/invalid payment information",
            message: "Invalid payment information"
        },
        REFUND_REASON_MISSING: {
            code: "Offer/refund reason missing",
            message: "You must provide a reason for the refund"
        },
        NO_REFUND_FOUND: {
            code: "Offer/no refund found",
            message: "No refund found"
        },
        REFUNDID_MISSING: {
            code: "Offer/refund ID missing",
            message: "Refund ID is required"
        },
        ALREADY_REQUESTED_REFUND: {
            code: "Offer/already requested refund",
            message: "Cannot submit multiple refund requests"
        },
        NO_RATING: {
            code: "Offer/no rating",
            message: "Customer did not leave a review."
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
            code: "Auth/not autherized",
            message: "You are not autherized access this information"
        },
        PROVIDER_NOT_FOUND: {
            code: "Auth/provider not found",
            message: "No provider with the name provided"
        },

        INVALID_LOGIN: {
            code: "Auth/invalid login",
            message: "Wrong username or password"
        },
        NOT_AUTHENTICATED: {
            code: "Auth/not authenticated",
            message: "Please login to continue"
        },
        USER_BANNED: {
            code: "Auth/user banned",
            message: "You are banned."
        }
    },
    UNKOWN: {
        code: "UNKOWN ERROR",
        message: "Something wrong happened"
    }
});