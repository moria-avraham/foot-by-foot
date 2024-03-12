import express from "express";
import connection from "../../DB/database";

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

export async function getProductFilter(req: express.Request, res: express.Response) {
    try {
        const filter = req.params.filter;
        if (!filter) throw new Error("no filter on getProductFilter");
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
        if (!productID) throw new Error("no id on deleteProductById")
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
        if (!productID) throw new Error("no id user");
        const { company, price, consumer, name, description, right, left, together, back, } = req.body;
        if (!company || !price || !consumer || !name || !description || !right || !left || !together || !back) throw new Error("no field or update ");
        const query = `UPDATE product, images SET product.company = '${company}', product.price = '${price}' , product.consumer = '${consumer}' , product.product_name = '${name}' , product.description = '${description}' , images.right_shoe = '${right}' , images.left_shoe = '${left}' , images.together = '${together}' , images.back = '${back}' WHERE product.product_id = images.product_id AND product.product_id='${productID}';`;
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
        if (!search) throw new Error("no data fot search ");
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
        if (!userID) throw new Error("no Id");
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
        if (!cartID) throw new Error("no id on deleteFromCart")
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