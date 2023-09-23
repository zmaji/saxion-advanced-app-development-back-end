import client from "../Database/Connection.ts";

const getAllUsers = async () => {
  try {
    const result = await client.query("SELECT * FROM users");
    return result;
  } catch (error) {
    console.error('Error retrieving users:', error);
  }
};

export { getAllUsers };