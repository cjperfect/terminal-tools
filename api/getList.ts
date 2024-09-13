import Mock from "mockjs";
const random = Mock.Random;

export default function handler(req, res) {
  res.status(200).json({
    code: 200,
    message: "success",
    data: [random.cname(), random.cname(), random.cname()],
  });
}
