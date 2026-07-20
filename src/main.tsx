import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { DialRoot } from "dialkit"
import "dialkit/styles.css"
import "./index.css"
import App from "./App.tsx"
import { Provider } from "./components/ui/provider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <App />
      {import.meta.env.DEV ? <DialRoot defaultOpen={false} /> : null}
    </Provider>
  </StrictMode>,
)
