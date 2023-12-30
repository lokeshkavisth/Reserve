import React from "react";
import Navbar from "./components/Navbar";
import Router from "./routes/route";
import Loader from "./components/ui/Loader";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-2 md:px-4 py-10 md:py-20">
        <React.Suspense
          fallback={
            <div className="min-h-[80vh] grid place-items-center w-full text-xl md:text-3xl">
              <Loader />
            </div>
          }
        >
          <Router />
        </React.Suspense>
      </main>
      <Footer />
    </>
  );
};

export default App;
