const DB_NAME = "ExpenseTracker";

// Cookie options for secure use. Only server can handle cookies. Client can just read
const cookieOptions = { httpOnly: true, secure: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 };

export { DB_NAME, cookieOptions };
 