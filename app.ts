import express from "express";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function getFeedBack(question: string, reply: string) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${question}에 대한 질문에 대한 ${reply}라는/이라는 답변이 어떠한지 기술 면접관의 입장에서 평가해줘`,
        },
      ],
    });
    console.log("aowifjawiefj");

    return response.data.choices[0].message;
  } catch (error) {
    console.log(error);
  }
}

app.post("/api/question", async function (req, res) {
  const question = req.body.question;
  const reply = req.body.reply;
  const feedback = await getFeedBack(question, reply);
  console.log(feedback);
  res.json(feedback);
});

app.listen(3000);
