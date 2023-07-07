import express from "express";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

type Category = "FRONT_END" | "BACK_END" | "PRODUCT_DESIGNER" | "DEVOPS";

const db: Record<
  string,
  {
    reply: string;
    feedback: ChatCompletionRequestMessage;
    category: Category;
  }[]
> = {};

async function getFeedBack(
  question: string,
  reply: string
): Promise<ChatCompletionRequestMessage> {
  const configuration = new Configuration({
    apiKey: //api key,
  });

  try {
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [
        {
          role: "user",
          content: `${question}에 대한 질문에 대한 ${reply}라는/이라는 답변이 어떠한지 기술 면접관의 입장에서 평가해줘`,
        },
      ],
    });

    return (
      response.data.choices[0].message ?? { content: "", role: "assistant" }
    );
  } catch (error) {
    console.log(error);
    return {
      role: "assistant",
      content: "문제가 발생했습니다.",
    };
  }
}

app.post("/api/interview", async function (req, res) {
  const question = req.body.question;
  const reply = req.body.reply;
  const category = req.body.category;
  const feedback = await getFeedBack(question, reply);
  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  const filteredQuestion = question.replace(reg, "");

  if (!db[filteredQuestion]) db[filteredQuestion] = [];
  db[filteredQuestion].push({ feedback, reply, category });

  res.json(feedback);
});

app.get("/api/interview/:question", async function (req, res) {
  const question = req.params.question;
  const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
  const filteredQuestion = question.replace(reg, "");
  console.log(filteredQuestion);
  console.log(db);
  console.log(db[filteredQuestion]);
  const row = db[filteredQuestion];
  res.json(row);
});

app.get("/api/interview", async function (req, res) {
  res.json(db);
});

app.listen(8080);
