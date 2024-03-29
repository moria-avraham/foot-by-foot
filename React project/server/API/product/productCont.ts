import express from "express";
import connection from "../../DB/database";
import Stripe from "stripe";
import { RowDataPacket } from "mysql2";


export async function getRightShoe(req: express.Request, res: express.Response) {
    try {

        const query = "SELECT images.right_shoe, images.product_id,product.price, product.product_name FROM shoes_schema.images INNER JOIN shoes_schema.product ON shoes_schema.product.product_id=shoes_schema.images.product_id;";
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function getAllProduct(req: express.Request, res: express.Response) {
    try {

        const query = "SELECT * FROM shoes_schema.images INNER JOIN shoes_schema.product ON shoes_schema.product.product_id=shoes_schema.images.product_id;";
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function getProductById(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        if (!id) throw new Error("no Id");
        const query = `SELECT * FROM shoes_schema.images INNER JOIN shoes_schema.product ON shoes_schema.product.product_id = shoes_schema.images.product_id WHERE shoes_schema.product.product_id = ${id}; `;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;

                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function getSizeByIdProduct(req: express.Request, res: express.Response) {
    try {
        const id = req.params.id;
        if (!id) throw new Error("no Id in getSizeByIdProduct function");
        const query = `SELECT * FROM shoes_schema.sizes where sizes.product_id=${id};`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;

                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function getProductFilter(req: express.Request, res: express.Response) {
    try {
        const filter = req.params.filter;
        if (!filter) throw new Error("no filter on getProductFilter function");
        const query = `SELECT * 
    FROM shoes_schema.images 
    INNER JOIN shoes_schema.product 
    ON shoes_schema.product.product_id = shoes_schema.images.product_id
    WHERE shoes_schema.product.consumer ='${filter}' or shoes_schema.product.company='${filter}'; `;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function createProduct(req: express.Request, res: express.Response) {
    try {

        const { company, price, consumer, name, description, right, left, together, back } = req.body;
        if (!company || !price || !consumer || !name || !description || !right || !left || !together || !back) throw new Error("no ");

        const query = `INSERT INTO product (company, price, consumer, product_name,description) VALUES ('${company}','${price}','${consumer}','${name}','${description}');`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err
                //@ts-ignore
                if (results.affectedRows) {
                    //@ts-ignore
                    const queryProduct = `INSERT INTO images (right_shoe, left_shoe, together, back, product_id) VALUES('${right}', '${left}', '${together}', '${back}', '${results.insertId}');`
                    connection.query(queryProduct, (errProduct, resultsProduct) => {
                        if (errProduct) throw errProduct;
                        res.send({ ok: true, resultsProduct })
                    })
                }
            } catch (error) {
                res.status(500).send({ ok: false, error })
            }

        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function deleteProductById(req: express.Request, res: express.Response) {
    try {
        const { productID } = req.params;
        if (!productID) throw new Error("no id on deleteProductById function")
        const query = `DELETE FROM images WHERE product_id = ${productID};`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                const queryProduct = `DELETE FROM product WHERE product_id = ${productID};`;
                connection.query(queryProduct, (errProduct, resultsProduct) => {
                    if (errProduct) throw errProduct;
                    //@ts-ignore
                    if (results.affectedRows) {
                        res.send({ ok: true, results })
                    } else {
                        res.send({ ok: true, results: "No rows were deleted" })
                    }
                })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }

}

export async function updateProductById(req: express.Request, res: express.Response) {
    try {
        const { productID } = req.params;
        if (!productID) throw new Error("no id in updateProductById function");
        const { company, price, consumer, name, description, right, left, together, back, } = req.body;
        if (!company || !price || !consumer || !name || !description || !right || !left || !together || !back) throw new Error("no field or update ");
        const query = `UPDATE product, images  SET product.company = '${company}', product.price = '${price}' , product.consumer = '${consumer}' , product.product_name = '${name}' , product.description = '${description}' , images.right_shoe = '${right}' , images.left_shoe = '${left}' , images.together = '${together}' , images.back = '${back}' WHERE product.product_id = images.product_id AND product.product_id='${productID}';`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function getSearch(req: express.Request, res: express.Response) {
    try {
        const { search } = req.params;
        if (!search) throw new Error("no data fot search getSearch function");
        const query = `SELECT * 
    FROM shoes_schema.images 
    INNER JOIN shoes_schema.product 
    ON shoes_schema.product.product_id = shoes_schema.images.product_id
    WHERE shoes_schema.product.consumer like '%${search}%' or shoes_schema.product.company like '%${search}%' or shoes_schema.product.product_name like '%${search}%' or shoes_schema.product.description like '%${search}%'; `;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function getCartById(req: express.Request, res: express.Response) {
    try {
        const userID = req.params.userID;
        if (!userID) throw new Error("no Id in getCartById function");
        const query = `SELECT * FROM cart
JOIN product ON product.product_id = cart.prouct_id
JOIN images ON images.product_id = cart.prouct_id where cart.user_id=${userID}; `;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;

                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }

}

export async function deleteFromCart(req: express.Request, res: express.Response) {
    try {
        const { cartID } = req.params;
        if (!cartID) throw new Error("no id on deleteFromCart function")
        const query = `DELETE FROM cart WHERE cart_id = ${cartID};`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function getWishList(req: express.Request, res: express.Response) {
    try {
        const userID = req.params.userID;
        if (!userID) throw new Error("no Id in getWishList function");
        const query = `SELECT * FROM wish_list
JOIN product ON product.product_id = wish_list.product_id
JOIN images ON images.product_id = wish_list.product_id where wish_list.user_id=${userID};`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function addWishList(req: express.Request, res: express.Response) {
    try {
        const { productID, userID } = req.body;
        if (!userID || !productID) throw new Error("Not enough data for addWishList function");
        const query = `INSERT INTO shoes_schema.wish_list(product_id, user_id) VALUES ('${productID}', '${userID}');`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function deleteFromWishList(req: express.Request, res: express.Response) {
    try {
        const { wishListID } = req.params;

        if (!wishListID) throw new Error("no id on deleteFromWishList function")
        const query = `DELETE FROM wish_list WHERE wish_list.id = ${wishListID};`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }
}

export async function createCart(req: express.Request, res: express.Response) {
    try {
        const { productID, userID, size } = req.body;
        if (!productID || !userID || !size) throw new Error("Not enough data for createCart function ");
        const query = `INSERT INTO cart (prouct_id, user_id ,size) VALUES ('${productID}', '${userID}', '${size}');`;
        connection.query(query, (err, results) => {
            try {
                if (err) throw err;
                res.send({ ok: true, results })
            } catch (error) {
                console.error(error)
                res.status(500).send({ ok: false, error })
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ ok: false, error })
    }

}


