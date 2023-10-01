import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Header } from "./components"
import {
  Error,
  Capsules,
} from "./pages"

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Capsules />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
