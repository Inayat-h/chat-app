const dotenv=require("dotenv");
dotenv.config();
const express=require("express");

const mongoose=require("mongoose");
const Url=process.env.MONGOURL;
const userRouter=require("./routers/userRouter")
const cors=require("cors");
const cookieParser=require("cookie-parser");
const secureRoute=require("./middlewere/secureRoute");
const messageRouter=require("./routers/messageRouter");

const {server,app}=require("./socketIo/server");







main().then((res)=>{
  console.log("connected");
}).catch((err)=>{
  console.log(err);
});



async function main(){
  await mongoose.connect(Url);

};

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/api/user",userRouter);
app.use("/api/message",messageRouter);

app.post('/app', async function (req, res) {
  console.log(req.body);
})

server.listen(4002,()=>{
    console.log("app.listen");
});
