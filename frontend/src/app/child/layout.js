import { Inter } from "next/font/google";
import "../globals.css";
import Header from "../layout/headerChild";
import Footer from "../layout/footerChild";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className=" absolute container h-full bg-gradient-to-r from-white to-gray-200">
            <div className="flex justify-center mt-20">
              <div className="w-8/12 shadow-lg">
                <Header></Header>
                {children}
                <Footer></Footer>
              </div>
            </div>
        </div>
        <script src="https://kit.fontawesome.com/6895c8023a.js" crossorigin="anonymous"></script>
      </body>
    </html>
  );
}
