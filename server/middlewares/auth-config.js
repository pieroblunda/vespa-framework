import { Buffer } from 'buffer';

/*
Credentias
---------------
User: Nexilia
Pass: <process.env.BASIC_AUTH_PASS>
*/

function notAuthenticated(req, res) {
  res.set("WWW-Authenticate", "Basic realm=Login to the website config page, algorithm=base64");
  return res.status(401).send("Not authenticated");
};

export function authenticate(req, res, next) {
  if (req.get("Authorization") && process.env.BASIC_AUTH_PASS) {
    const parts = req.get("Authorization").split(' ');
    if (parts.length < 2) {
      return notAuthenticated(req, res);
    }
    //const scheme = parts[0]; // must be "Basic"
    const credentials = Buffer.from(parts[1], 'base64').toString().split(':');
    if (credentials[0] === "Nexilia" && credentials[1] === process.env.BASIC_AUTH_PASS) {
      next();
    } else {
      return notAuthenticated(req, res);
    }
  } else {
    return notAuthenticated(req, res);
  }
}
