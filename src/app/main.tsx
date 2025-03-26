import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Conway from "@pages/Conway.tsx";
import Home from "@pages/Home.tsx";
import About from "@pages/About.tsx";
import Pokemons from "@pages/Pokemons";
import Pokemon from "@pages/Pokemon.tsx";
import PrepareForTest from "@pages/PrepareForTest.tsx";
import Layout from "./Layout.tsx";

async function enableMocking() {
    // @ts-expect-error file is good but not found by IDE
    const { worker } = await import("../mocks/browser");
    return worker.start();
}
enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/conway" element={<Conway />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/pokemons" element={<Pokemons />}></Route>
                    <Route path="/pokemons/:name" element={<Pokemon />}></Route>
                    <Route path="/prepareForTest" element={<PrepareForTest />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
});