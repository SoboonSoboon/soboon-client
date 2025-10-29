export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="pt-15">
        <div className="mx-auto min-h-screen w-full max-w-[1200px] p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </body>
    </html>
  );
}
