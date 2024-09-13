import Mock from "mockjs";
const random = Mock.Random;

export default function handler(req, res) {
  res.status(200).json({
    code: 200,
    message: "success",
    data: {
      id: random.id(),
      title: random.ctitle(),
      content: random.csentence(),
    },
  });
}
