import Navbar from "./components/Navbar";
import React from "react";
import Router from "./routes/route";
import Loader from "./components/ui/Loader";
// import Home from "./pages/Home";
// import Hero from "./components/Hero";
// import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-2 md:px-4 py-10 md:py-20">
        <React.Suspense fallback={<Loader />}>
          <Router />
        </React.Suspense>
      </main>
      {/* <Home /> */}
      {/* <Hero /> */}
      {/* <SignIn /> */}

      {/* <Footer /> */}
    </>
  );
};

export default App;
