import express from "express" ;
import userRoutes from "./routes/userRoutes"
import dotenv  from "dotenv";
import cors from "cors"



dotenv.config();
const PORT = process.env.PORT ;

const app = express() ;

app.use(express.json());
app.use(cors({
    origin :["http://localhost:5000"],
    methods :["GET","PUT","POST","PATCH","DELETE"],
    credentials : true

}))

app.use("/api/" , userRoutes) ;


app.listen(PORT ,()=> {
    console.log(`server is listening at ${PORT}`);
})

