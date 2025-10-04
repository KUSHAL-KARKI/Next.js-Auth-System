import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
  username: string;
  email: string;
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      throw new Error("No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    return {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    };
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
