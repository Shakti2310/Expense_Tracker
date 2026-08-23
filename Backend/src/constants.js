const DB_NAME = "ExpenseTracker";

// Cookie options for secure use. Only server can handle cookies. Client can just read
const cookieOptions1d = { httpOnly: true, secure: true, sameSite: "strict", maxAge: 24 * 60 * 60 * 1000 };
const cookieOptions7d = { httpOnly: true, secure: true, sameSite: "strict", maxAge: 7 * 24 * 60 * 60 * 1000 };

export { DB_NAME, cookieOptions1d, cookieOptions7d };
 