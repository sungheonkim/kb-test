import axiosInstance from './instance';

const getTodoExampleTwo = async (idx: number) => {
  try {
    const response = await axiosInstance.get(`todos/${idx}`);
    return response.data.data;
  } catch (err) {
    // console.log(err);
  }
};

export default getTodoExampleTwo;
