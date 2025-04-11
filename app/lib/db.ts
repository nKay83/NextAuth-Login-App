import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "app/data/users.json");

export async function getUser(email: string) {
    try {
        const users = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
        const user = users.find((user: any) => user.email === email);
        console.log(user)
        return user;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      throw new Error('Failed to fetch user.');
    }
  }
export async function createUser(name: string, email: string, password: string) {
    try {
        const users = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
        const hashedPassword = await bcrypt.hash("", 10);
        const newUser = { name, email, password: hashedPassword };
        console.log("password", password)
        console.log("hashedPassword", hashedPassword)
        console.log("newUser", newUser)
        users.push(newUser);
        fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
        return newUser;
    } catch (error) {
        console.error('Failed to create user:', error);
        throw new Error('Failed to create user.');
    }
}

export async function createUserOAuth2(name: string, email: string) {
  try {
      const users = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
      const password = "";
      const newUser = { name, email, password: password };
      console.log("newUser", newUser)
      users.push(newUser);
      fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
      return newUser;
  } catch (error) {
      console.error('Failed to create user:', error);
      throw new Error('Failed to create user.');
  }
}

export async function updateUser(email: string, name: string, password: string) { 
    try {
        const users = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = { name, password: hashedPassword };
        const user = users.find((user: any) => user.email === email);
        if (user) {
            user.name = updatedUser.name;
            user.password = updatedUser.password;
            fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
        }
        return updatedUser;
    }catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('Failed to create user.');
  }
}
export async function updatePassword(email: string, password: string) { 
  try {
      const users = JSON.parse(fs.readFileSync(dataFile, "utf8") || "[]");
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = { password: hashedPassword };
      const user = users.find((user: any) => user.email === email);
      if (user) {
          user.password = updatedUser.password;
          fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
      }
      return updatedUser;
  }catch (error) {
    console.error('Failed to update user:', error);
    throw new Error('Failed to create user.');
}
}