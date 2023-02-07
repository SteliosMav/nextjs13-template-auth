import Button from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="h-full bg-amber-100 ">
      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Buttons</h2>
        <div className="flex gap-2">
          <Button>Default</Button>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
          <Button color="warn">Warn</Button>
        </div>
        <div className="flex gap-2">
          <Button outline>Outline</Button>
          <Button color="primary" outline>
            Primary
          </Button>
          <Button color="secondary" outline>
            Secondary
          </Button>
          <Button color="warn" outline>
            Warn
          </Button>
        </div>
      </section>
    </main>
  );
}
