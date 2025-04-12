

export const placeOrderInputRef = [
    {
        types: "text",
        placeHolder: 'Street Address',
    },
    {
        types: "text",
        placeHolder: 'State - Contry',
    },
    {
        types: "text",
        placeHolder: 'State - Contry',
    },
    {
        types: "number",
        placeHolder: 'PIN - Code',
    }
]

export const LinkNav = [
    {
        name: 'Home',
        to: ''
    }, 
    {
        name: 'Shop',
        to: 'product'
    }, 
    {
        name: 'Order',
        to: 'user/purchases'
    },
    {
        name: 'Orders',
        to: 'seller/purchases'
    }, 
    {
        name: 'Add Product',
        to: 'seller/addproduct'
    },
    {
        name: 'View Product',
        to: 'seller/viewproduct'
    }, 
]

export const signInInputRef = [
    {
        types: "email",
        placeHolder: 'email',
    },
    {
        types: "password",
        placeHolder: 'password',
    },
]

export const signUpInputRef = [
    {
        types: "text",
        placeHolder: 'name',
    },
    {
        types: "email",
        placeHolder: 'email',
    },
    {
        types: "password",
        placeHolder: 'password',
    },
]

export const addProductInputRef = [
    {
        types: "text",
        placeHolder: 'product name',
    },
    {
        types: "number",
        placeHolder: 'price',
    },
    {
        types: "text",
        placeHolder: 'description',
    },
    {
        types: "text",
        placeHolder: 'image link',
    },
]