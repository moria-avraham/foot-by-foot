
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import connection from "../../DB/database";

export const isAdmin = async (req: Request, res: Response, next: NextFunction
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(403).send({
                ok: false,
                error: "Access denied. Admin privileges required.",
            });
        }

        const secret = process.env.SECRET;


        const decoded: any = jwt.verify(token, secret);


        const userId = decoded.user_id;


        const query =
            " SELECT role FROM users WHERE user_id= ?";
        connection.query(query, [userId], (err, results) => {
            if (err) {
                console.error(err);
                return res
                    .status(500)
                    .send({ ok: false, error: "Internal server error" });
            }

            const userRole = results[0]?.role;

            if (userRole === "admin") {

                next();
            } else {

                res
                    .status(403)
                    .send({
                        ok: false,
                        error: "Access denied. Admin privileges required.",
                    });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ ok: false, error: "Internal server error" });
    }
};