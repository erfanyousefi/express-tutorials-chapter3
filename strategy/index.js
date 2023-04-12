//basic
const usernamePassword="erfanyousefi/12345678";
const base64Data = Buffer.from(usernamePassword).toString("base64");
console.log(base64Data);
//username:password
const decodedData = Buffer.from(base64Data, "base64").toString("ascii");
const [username, password] = decodedData.split("/");
console.log(username, password);
//Bearer
/* req(login) => (verify) res => token jwt(xxx.yyy.zzz) => client
 headers : {authorization : Bearer <Token>} √ */

//Api Key
// queryString => https://domain.com?api-key=token
// headers: {X-API-KEY:token}

//Digest

//OAuth1.0 OAuth2.0
// google auth, github auth ,...