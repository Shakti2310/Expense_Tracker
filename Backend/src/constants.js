const DB_NAME = "ExpenseTracker";

// Cookie options for secure use. Only server can handle cookies. Client can just read
const cookieOptions = { httpOnly: true, secure: true };

export { DB_NAME, cookieOptions };
