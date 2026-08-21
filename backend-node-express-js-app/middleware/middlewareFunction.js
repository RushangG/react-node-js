

export async function middlewareFunction(req, res, next) {
    {
        try {
            console.log("Middleware function executed");
            next();
        } catch (error) {
            console.error("Error in middlewareFunction:", error);
            next(error);
        }
    }
}