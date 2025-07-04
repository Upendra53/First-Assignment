
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="574805204956-len2q3g5niqs3sqpe2snb41vc4oek2q4.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
