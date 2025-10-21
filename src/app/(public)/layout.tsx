export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex flex-1 min-h-screen m-auto">{children}</main>;
}
