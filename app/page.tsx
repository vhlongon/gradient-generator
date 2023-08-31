import { Form } from '@/components/Form';

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] justify-center flex-col items-center p-24 ">
      <h1 className="font-accent text-6xl text-center drop-effect mb-8">Gradient Generator</h1>
      <Form />
    </main>
  );
}
