import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";

export const metadata = {
  title: "Dev Components",
};

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

      <section className="flex flex-col gap-2">
        <h2 className="text-xl font-bold">Input Fields</h2>
        <TextInput
          type="text"
          id="text"
          name="text"
          placeholder="Text"
          className="w-fit"
        />
      </section>
    </main>
  );
}
