import { MDXRemote } from 'next-mdx-remote/rsc';
import { promises as fs } from 'fs';
import path from 'path';
import { SimulatorButton } from '@/components/ui/simulator-button';

const components = {
  SimulatorButton
};

export default async function PriorityPage() {
  const source = await fs.readFile(
    path.join(process.cwd(), 'src/app/docs/components/priority.mdx'),
    'utf-8'
  );

  return (
    <div className="prose prose-invert max-w-none">
      <MDXRemote source={source} components={components} />
    </div>
  );
} 