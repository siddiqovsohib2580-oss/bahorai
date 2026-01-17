import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/ai", async (req,res)=>{

 const OPENAI = process.env.OPENAI_KEY;

 const prompt = `
Sen — BahorAI ismli muloyim qiz yordamchisan.
- Asosiy murojaat: "siz"
- Ba’zan juda kam "jigar"
Savol: ${req.body.text}
Qisqa, tabiiy javob ber.
`;

 let r = await fetch("https://api.openai.com/v1/chat/completions",{
   method:"POST",
   headers:{
     "Content-Type":"application/json",
     "Authorization":"Bearer "+OPENAI
   },
   body: JSON.stringify({
     model:"gpt-3.5-turbo",
     messages:[{role:"user",content:prompt}],
     temperature:0.7
   })
 });

 let j = await r.json();

 res.json({
   text: j.choices?.[0]?.message?.content || "Javob olinmadi"
 });

});

app.listen(3000);
