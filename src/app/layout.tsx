import Navbar from "../components/Navbar";
import Provider from "../components/Provider";
import "../styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Discover & Share AI-Powered Prompts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {" "}
        <div className="main">
          <div className="gradient" />
        </div>
        <Provider>
          <main className="app">
            <Navbar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
