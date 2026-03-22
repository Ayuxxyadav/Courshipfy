import express from "express" ;
import userRoutes from "./routes/userRoutes"
import dotenv  from "dotenv";


dotenv.config();
const PORT = process.env.PORT ;

const app = express() ;

app.use(express.json());

app.use("/api/" , userRoutes) ;


app.listen(PORT ,()=> {
    console.log(`server is listening at ${PORT}`);
})

