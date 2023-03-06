export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <main>
      <div className="h-full bg-amber-100 ">
        <h1>Hello World!</h1>
      </div>
      <div className="h-full bg-slate-400 ">
        <h1>Two</h1>
      </div>
      <div className="h-full border-l-indigo-200 ">
        <h1>Three</h1>
      </div>
      <div className="h-full bg-red-100 ">
        <h1>Four</h1>
      </div>
      <div className="h-full bg-green-200 ">
        <h1>Five</h1>
      </div>
    </main>
  );
}
