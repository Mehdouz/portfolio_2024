import localFont from "next/font/local";

const humane = localFont({
  src: "../public/fonts/humaneBold.woff2",
  variable: "--font-humane",
});

const roobert = localFont({
  src: "../public/fonts/roobertRegular.woff2",
  variable: "--font-roobert",
});

export default function Layout({ className, children }) {
  return (
    <div className={` ${humane.variable} ${roobert.variable} relative ${className}`}>
      <main>{children}</main>
    </div>
  );
}
