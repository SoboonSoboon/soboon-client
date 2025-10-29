export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="pt-15">
        <div className="mx-auto min-h-screen w-full max-w-[1232px] px-2.5 pt-4 sm:pt-6 md:px-4 md:pt-8">
          {children}
        </div>
      </body>
    </html>
  );
}
