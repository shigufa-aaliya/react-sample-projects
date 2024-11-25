import User from "./User";
import UserClass from "./UserClass";
import CryptoJS from "crypto-js";

const About = () =>{

    // Text to encrypt
    const plainText = "Namaste React!";
    const secretKey = "mySecretKey";

    // Encrypt the text
    const encryptedText = CryptoJS.AES.encrypt(plainText, secretKey).toString();

    // Decrypt the text (optional for demonstration)
    const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);

    return (<div>
        <h1>About Component</h1>
        <h2>This is Namaste react web series</h2>


        {/* Display encryption results */}
        <p><strong>Original Text:</strong> {plainText}</p>
            <p><strong>Encrypted Text:</strong> {encryptedText}</p>
            <p><strong>Decrypted Text:</strong> {decryptedText}</p>

        {/* <User name={"AALIYA (Function)"}/> */}
        <UserClass name={"AALIYA (Class)"}/>
    </div>
    ); 
}

export default About;