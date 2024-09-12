import Mock from "mockjs";
const Random = Mock.Random;

const getList = Mock.mock("/api/getList", "get", (req, res) => {
  const ret = Mock.mock({
    username: "@cname",
    age: Random.integer(60, 100),
    ID: Random.id(),
  });
  return {
    status: 200,
    data: ret,
  };
});

export { getList };
